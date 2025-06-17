import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/NavigationType';
import SearchBar from '../../components/SearchBar/SearchBar';

type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

interface CategoryScreenProps {
  navigation: CategoryScreenNavigationProp;
  route: CategoryScreenRouteProp;
}
import { categoryScreenStyles } from '../../../assets/styles/CategoryScreen/CategoryScreenStyles';

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation }) => {
  const categories = [
    { id: '1', name: '3D Design', image: require('../../../assets/images/3D.png'), color: '#8E44AD' },
    { id: '2', name: 'Graphic Design', image: require('../../../assets/images/Graphic.png'), color: '#E74C3C' },
    { id: '3', name: 'Web Development', image: require('../../../assets/images/WebDev.png'), color: '#3498DB' },
    { id: '4', name: 'SEO & Marketing', image: require('../../../assets/images/Seo.png'), color: '#1ABC9C' },
    { id: '5', name: 'Finance & Accounting', image: require('../../../assets/images/Finance.png'), color: '#2980B9' },
    { id: '6', name: 'Personal Development', image: require('../../../assets/images/PerDev.png'), color: '#F39C12' },
    { id: '7', name: 'Office Productivity', image: require('../../../assets/images/Office.png'), color: '#16A085' },
    { id: '8', name: 'HR Management', image: require('../../../assets/images/HR.png'), color: '#34495E' },
  ];

  return (
    <View style={categoryScreenStyles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Platform.OS === 'android' ? '#f8f9fa' : undefined}
        translucent={false}
      />
      
      <SafeAreaView style={categoryScreenStyles.safeArea}>
        {Platform.OS === 'android' && <View style={categoryScreenStyles.androidStatusBarSpacer} />}
        
        {/* Header */}
        <View style={categoryScreenStyles.header}>
          <TouchableOpacity 
            style={categoryScreenStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={categoryScreenStyles.headerTitle}>All Category</Text>
          <View style={categoryScreenStyles.headerSpacer} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={categoryScreenStyles.scrollContent}
        >
          {/* Search Bar */}
          <SearchBar
            onFilterPress={() => console.log('Filter pressed')}
            onSearchPress={() => navigation.navigate('Search')}
            onChangeText={(text) => console.log('Search text:', text)}
            variant="separated"
          />

          {/* Categories Grid */}
          <View style={categoryScreenStyles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={categoryScreenStyles.categoryCard}
              >
                <View style={[categoryScreenStyles.iconContainer, { backgroundColor: `${category.color}20` }]}>
                  <Image 
                    source={category.image} 
                    style={categoryScreenStyles.categoryImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={categoryScreenStyles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CategoryScreen; 