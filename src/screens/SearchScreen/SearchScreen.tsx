import React, { useState } from 'react';
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
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([
    { id: '1', title: '3D Design' },
    { id: '2', title: 'Graphic Design' },
    { id: '3', title: 'Programming' },
    { id: '4', title: 'SEO & Marketing' },
    { id: '5', title: 'Web Development' },
    { id: '6', title: 'Office Productivity' },
    { id: '7', title: 'Personal Development' },
    { id: '8', title: 'Finance & Accounting' },
    { id: '9', title: 'HR Management' },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchText);
  };

  const handleRemoveRecentSearch = (id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  const handleSeeAll = () => {
    // Navigate to see all recent searches
    console.log('See all recent searches');
  };

  const renderRecentSearchItem = ({ item }: { item: RecentSearchItem }) => (
    <View style={styles.recentSearchItem}>
      <Text style={styles.recentSearchText}>{item.title}</Text>
      <TouchableOpacity 
        onPress={() => handleRemoveRecentSearch(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="close" size={16} color="#999" />
      </TouchableOpacity>
    </View>
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
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSearchContainer}>
        <View style={styles.recentSearchHeader}>
          <Text style={styles.recentSearchTitle}>Recents Search</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>SEE ALL</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearchItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.recentSearchList}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen; 