import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/NavigationType';
import { ArrowLeft as LucideArrowLeft, ArrowRight as LucideArrowRight } from 'lucide-react-native';

// Types
export type Filters = typeof INITIAL_FILTERS;
export type FilterCategory = keyof Filters;
export type FilterItem<C extends FilterCategory> = keyof Filters[C];

export const INITIAL_FILTERS = {
  subCategories: {
    'Web Development': false,
    '3D Animation': false,
    '3D Design': false,
    'Graphic Design': false,
    'SEO & Marketing': false,
    'Arts & Humanities': false,
  },
  levels: {
    'All Levels': false,
    Beginners: false,
    Intermediate: false,
    Expert: false,
  },
  price: { Paid: false, Free: false },
  features: {
    'All Caption': false,
    Quizzes: false,
    'Coding Exercise': false,
    'Practice Tests': false,
  },
  rating: {
    '4.5 & Up Above': false,
    '4.0 & Up Above': false,
    '3.5 & Up Above': false,
    '3.0 & Up Above': false,
  },
  videoDurations: {
    '0-2 Hours': false,
    '3-6 Hours': false,
    '7-16 Hours': false,
    '17+ Hours': false,
  },
};

const ArrowLeft = ({ color = '#000000' }: { color?: string }) => (
  <LucideArrowLeft color={color} size={32} />
);

const ArrowRight = () => (
  <LucideArrowRight color="#0961f5" size={32} />
);

const Check = () => <Text style={styles.checkIcon}>✓</Text>;

type FilterSectionProps<C extends FilterCategory> = {
  title: string;
  items: Filters[C];
  category: C;
  onFilterChange: (category: C, item: FilterItem<C>) => void;
};

function FilterSection<C extends FilterCategory>({
  title,
  items,
  category,
  onFilterChange,
}: FilterSectionProps<C>) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {Object.entries(items).map(([item, checked]) => (
          <TouchableOpacity
            key={item}
            style={styles.optionRow}
            onPress={() => onFilterChange(category, item as FilterItem<C>)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={`${item} filter`}
          >
            <View style={[styles.checkbox, checked ? styles.checkboxChecked : styles.checkboxUnchecked]}>
              {checked && <Check />}
            </View>
            <Text style={styles.optionLabel}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const MemoFilterSection = memo(FilterSection) as typeof FilterSection;

const FilterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'FilterOnlineCourses'>>();
  const { filters: initialFilters, onApplyFilters } = route.params;
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = <C extends FilterCategory>(
    category: C,
    item: FilterItem<C>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  const handleClearFilters = () => setFilters(INITIAL_FILTERS);

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    navigation.navigate('OnlineCourses', { filters });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft color="#202244" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter</Text>
        </View>
        <TouchableOpacity
          onPress={handleClearFilters}
          accessibilityRole="button"
          accessibilityLabel="Clear filters"
        >
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Sections */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.filterSections}>
          <MemoFilterSection
            title="SubCategories:"
            items={filters.subCategories}
            category="subCategories"
            onFilterChange={handleFilterChange}
          />
          <MemoFilterSection
            title="Levels:"
            items={filters.levels}
            category="levels"
            onFilterChange={handleFilterChange}
          />
          <MemoFilterSection
            title="Price:"
            items={filters.price}
            category="price"
            onFilterChange={handleFilterChange}
          />
          <MemoFilterSection
            title="Features:"
            items={filters.features}
            category="features"
            onFilterChange={handleFilterChange}
          />
          <MemoFilterSection
            title="Rating:"
            items={filters.rating}
            category="rating"
            onFilterChange={handleFilterChange}
          />
          <MemoFilterSection
            title="Video Durations:"
            items={filters.videoDurations}
            category="videoDurations"
            onFilterChange={handleFilterChange}
          />
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.applyContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilters}
          accessibilityRole="button"
          accessibilityLabel="Apply filters"
        >
          <Text style={styles.applyText}>Apply</Text>
          <View style={styles.arrowContainer}>
            <ArrowRight />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#f5f9ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  clearButton: {
    color: '#545454',
    fontWeight: '500',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  filterSections: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#202244',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  checkboxChecked: {
    backgroundColor: '#167f71',
    borderColor: '#167f71',
  },
  checkboxUnchecked: {
    backgroundColor: '#ffffff',
    borderColor: '#b4bdc4',
  },
  optionLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#545454',
    flex: 1,
  },
  applyContainer: {
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  applyButton: {
    backgroundColor: '#0961f5',
    borderRadius: 60,
    paddingVertical: 32,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  applyText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#000000',
  },
  arrowRightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowRightText: {
    fontSize: 24,
    color: '#0961f5',
    fontWeight: 'bold',
  },
  checkIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterScreen;
