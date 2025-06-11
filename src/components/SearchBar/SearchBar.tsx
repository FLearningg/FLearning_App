import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchBarStyles } from '../../../assets/styles/SearchBar/SearchBarStyles';

interface SearchBarProps extends TextInputProps {
  containerStyle?: ViewStyle;
  showFilter?: boolean;
  onFilterPress?: () => void;
  onSearchPress?: () => void;
  variant?: 'default' | 'separated';
}

const SearchBar: React.FC<SearchBarProps> = ({
  containerStyle,
  showFilter = true,
  onFilterPress,
  onSearchPress,
  placeholder = "Search for..",
  variant = 'default',
  ...textInputProps
}) => {
  if (variant === 'separated') {
    return (
      <View style={[searchBarStyles.separatedContainer, containerStyle]}>
        <View style={searchBarStyles.separatedSearchBar}>
          <TextInput
            style={searchBarStyles.separatedSearchInput}
            placeholder={placeholder}
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            {...textInputProps}
          />
          <TouchableOpacity onPress={onSearchPress} style={searchBarStyles.separatedSearchIcon}>
            <Ionicons name="search" size={Platform.OS === 'android' ? 20 : 24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[searchBarStyles.container, containerStyle]}>
      <View style={searchBarStyles.searchBar}>
        <TouchableOpacity onPress={onSearchPress} style={searchBarStyles.searchIconContainer}>
          <Ionicons name="search" size={22} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={searchBarStyles.searchInputContainer} 
          onPress={onSearchPress}
          activeOpacity={1}
        >
          <TextInput
            style={searchBarStyles.searchInput}
            placeholder={placeholder}
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            editable={false}
            pointerEvents="none"
            {...textInputProps}
          />
        </TouchableOpacity>
        {showFilter && (
          <TouchableOpacity style={searchBarStyles.filterButton} onPress={onFilterPress}>
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar; 