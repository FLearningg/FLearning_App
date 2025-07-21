import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/NavigationType';
import { styles } from '../../../assets/styles/SearchScreen/SearchScreenStyles';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}

interface RecentSearchItem {
  id: string;
  title: string;
  timestamp: number;
}

const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 10;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  // Load recent searches from AsyncStorage
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (storedSearches) {
        const parsedSearches = JSON.parse(storedSearches);
        setRecentSearches(parsedSearches);
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearches = async (searches: RecentSearchItem[]) => {
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const addToRecentSearches = async (searchTerm: string) => {
    const newSearch: RecentSearchItem = {
      id: Date.now().toString(),
      title: searchTerm,
      timestamp: Date.now(),
    };

    // Remove duplicate if exists
    const filteredSearches = recentSearches.filter(
      item => item.title.toLowerCase() !== searchTerm.toLowerCase()
    );

    // Add new search to the beginning
    const updatedSearches = [newSearch, ...filteredSearches];

    // Keep only the most recent searches
    const limitedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(limitedSearches);
    await saveRecentSearches(limitedSearches);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = async () => {
    if (searchText.trim()) {
      // Add to recent searches
      await addToRecentSearches(searchText.trim());

      // Navigate to OnlineCourses with search query
      navigation.navigate('OnlineCourses', {
        searchQuery: searchText.trim(),
        fromBottomTab: false
      });
    }
  };

  const handleRecentSearchPress = async (searchTerm: string) => {
    // Add to recent searches (move to top)
    await addToRecentSearches(searchTerm);

    // Navigate to OnlineCourses with the recent search term
    navigation.navigate('OnlineCourses', {
      searchQuery: searchTerm,
      fromBottomTab: false
    });
  };

  const handleRemoveRecentSearch = async (id: string) => {
    const updatedSearches = recentSearches.filter(item => item.id !== id);
    setRecentSearches(updatedSearches);
    await saveRecentSearches(updatedSearches);
  };

  const handleClearAllRecentSearches = async () => {
    setRecentSearches([]);
    await saveRecentSearches([]);
  };

  const renderRecentSearchItem = ({ item }: { item: RecentSearchItem }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item.title)}
    >
      <Text style={styles.recentSearchText}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveRecentSearch(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="close" size={16} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8F9FA"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search courses..."
            placeholderTextColor="#999"
            autoFocus={true}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSearchContainer}>
        <View style={styles.recentSearchHeader}>
          <Text style={styles.recentSearchTitle}>Recent Searches</Text>
          {recentSearches.length > 0 && (
            <TouchableOpacity onPress={handleClearAllRecentSearches}>
              <Text style={styles.seeAllText}>CLEAR ALL</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearchItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.recentSearchList}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#999', fontSize: 16 }}>
                No recent searches
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen; 