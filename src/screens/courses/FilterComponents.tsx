import React, { memo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../types/NavigationType";
import {
  ArrowLeft as LucideArrowLeft,
  ArrowRight as LucideArrowRight,
  Check as LucideCheck,
} from "lucide-react-native";

// --- Responsive Scaling Utilities ---
const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// --- Types ---
export type Filters = typeof INITIAL_FILTERS;
export type FilterCategory = keyof Filters;
export type FilterItem<C extends FilterCategory> = keyof Filters[C];

export const INITIAL_FILTERS = {
  subCategories: {
    "Web Development": false,
    "3D Animation": false,
    "3D Design": false,
    "Graphic Design": false,
    "SEO & Marketing": false,
    "Arts & Humanities": false,
  },
  levels: {
    "All Levels": false,
    Beginners: false,
    Intermediate: false,
    Expert: false,
  },
  price: { Paid: false, Free: false },
  features: {
    "All Caption": false,
    Quizzes: false,
    "Coding Exercise": false,
    "Practice Tests": false,
  },
  rating: {
    "4.5 & Up Above": false,
    "4.0 & Up Above": false,
    "3.5 & Up Above": false,
    "3.0 & Up Above": false,
  },
  videoDurations: {
    "0-2 Hours": false,
    "3-6 Hours": false,
    "7-16 Hours": false,
    "17+ Hours": false,
  },
};

// --- Helper Components ---

const ArrowLeft = ({ color = "#000000" }: { color?: string }) => (
  <LucideArrowLeft color={color} size={scale(28)} />
);

const ArrowRight = () => <LucideArrowRight color="#0961f5" size={scale(28)} />;

const Check = () => <LucideCheck color="#ffffffff" size={scale(24)} />;

// --- Filter Section Component ---

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
            <View
              style={[
                styles.checkbox,
                checked ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
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

// --- Main Filter Screen Component ---

const FilterScreen = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<RootStackParamList, "FilterOnlineCourses">>();

  const { filters: initialFilters } = route.params;

  const [filters, setFilters] = useState<Filters>(
    initialFilters || INITIAL_FILTERS
  );

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
    navigation.navigate("OnlineCourses", { filters });
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterSections}>
          <MemoFilterSection
            title="Categories:"
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
    backgroundColor: "#f5f9ff",
    paddingTop: verticalScale(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: "600",
    color: "#000000",
  },
  clearButton: {
    color: "#545454",
    fontWeight: "500",
    fontSize: moderateScale(18),
  },
  scrollView: {
    flex: 1,
  },
  filterSections: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(40),
  },
  section: {
    marginBottom: verticalScale(30),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#202244",
    marginBottom: verticalScale(20),
  },
  optionsContainer: {
    gap: verticalScale(18),
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(16),
  },
  checkbox: {
    width: scale(28),
    height: scale(28),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(2.5),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#167f71",
    borderColor: "#167f71",
  },
  checkboxUnchecked: {
    backgroundColor: "#ffffff",
    borderColor: "#b4bdc4",
  },
  optionLabel: {
    fontSize: moderateScale(18),
    fontWeight: "500",
    color: "#545454",
    flex: 1,
  },
  applyContainer: {
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#f5f9ff",
  },
  applyButton: {
    backgroundColor: "#0961f5",
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  applyText: {
    color: "#ffffff",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
  arrowContainer: {
    position: "absolute",
    right: scale(16),
    width: scale(40),
    height: scale(40),
    backgroundColor: "#ffffff",
    borderRadius: scale(24),
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    color: "#ffffff",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export default FilterScreen;
