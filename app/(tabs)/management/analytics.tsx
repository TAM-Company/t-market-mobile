import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "../../../src/data/mockData";

const { width } = Dimensions.get("window");

interface SalesData {
  date: string;
  sales: number;
  revenue: number;
}

interface CategoryPerformance {
  category: string;
  sales: number;
  revenue: number;
  percentage: number;
}

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");

  // Données simulées pour les ventes
  const salesData: SalesData[] = [
    { date: "2024-01-01", sales: 45, revenue: 125000 },
    { date: "2024-01-02", sales: 52, revenue: 142000 },
    { date: "2024-01-03", sales: 38, revenue: 98000 },
    { date: "2024-01-04", sales: 61, revenue: 178000 },
    { date: "2024-01-05", sales: 47, revenue: 134000 },
    { date: "2024-01-06", sales: 55, revenue: 156000 },
    { date: "2024-01-07", sales: 43, revenue: 119000 },
  ];

  const getCategoryPerformance = (): CategoryPerformance[] => {
    const categoryStats = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = { sales: 0, revenue: 0 };
      }
      // Simulation des ventes basée sur le stock
      const simulatedSales = Math.max(0, 100 - product.stock);
      acc[category].sales += simulatedSales;
      acc[category].revenue += simulatedSales * product.price;
      return acc;
    }, {} as Record<string, { sales: number; revenue: number }>);

    const totalRevenue = Object.values(categoryStats).reduce(
      (sum, cat) => sum + cat.revenue,
      0
    );

    return Object.entries(categoryStats)
      .map(([category, data]) => ({
        category,
        sales: data.sales,
        revenue: data.revenue,
        percentage: totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  };

  const getTopProducts = () => {
    return products
      .map((product) => ({
        ...product,
        simulatedSales: Math.max(0, 100 - product.stock),
        revenue: Math.max(0, 100 - product.stock) * product.price,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const getTotalStats = () => {
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
    const lowStockProducts = products.filter((p) => p.stock <= 5).length;

    return { totalSales, totalRevenue, averageOrderValue, lowStockProducts };
  };

  const categoryPerformance = getCategoryPerformance();
  const topProducts = getTopProducts();
  const stats = getTotalStats();

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {(["week", "month", "year"] as const).map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            selectedPeriod === period && styles.activePeriodButton,
          ]}
          onPress={() => setSelectedPeriod(period)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.activePeriodButtonText,
            ]}
          >
            {period === "week"
              ? "Semaine"
              : period === "month"
              ? "Mois"
              : "Année"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsGrid}>
      <View style={styles.statCard}>
        <Ionicons name="trending-up" size={24} color="#34C759" />
        <Text style={styles.statValue}>{stats.totalSales}</Text>
        <Text style={styles.statLabel}>Ventes totales</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="cash" size={24} color="#FF9500" />
        <Text style={styles.statValue}>
          {stats.totalRevenue.toLocaleString()}
        </Text>
        <Text style={styles.statLabel}>Chiffre d'affaires (FCFA)</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="calculator" size={24} color="#007AFF" />
        <Text style={styles.statValue}>
          {stats.averageOrderValue.toFixed(0)}
        </Text>
        <Text style={styles.statLabel}>Panier moyen (FCFA)</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="warning" size={24} color="#FF2A2A" />
        <Text style={styles.statValue}>{stats.lowStockProducts}</Text>
        <Text style={styles.statLabel}>Alertes stock</Text>
      </View>
    </View>
  );

  const renderCategoryChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.sectionTitle}>Performance par catégorie</Text>
      {categoryPerformance.map((category, index) => (
        <View key={category.category} style={styles.categoryItem}>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryName}>{category.category}</Text>
            <Text style={styles.categoryStats}>
              {category.sales} ventes • {category.revenue.toLocaleString()} FCFA
            </Text>
          </View>
          <View style={styles.categoryPercentage}>
            <Text style={styles.percentageText}>
              {category.percentage.toFixed(1)}%
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${category.percentage}%` },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTopProducts = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.sectionTitle}>Top 5 des produits</Text>
      {topProducts.map((product, index) => (
        <View key={product.id} style={styles.productItem}>
          <View style={styles.productRank}>
            <Text style={styles.rankNumber}>{index + 1}</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.productStats}>
              {product.simulatedSales} ventes •{" "}
              {product.revenue.toLocaleString()} FCFA
            </Text>
          </View>
          <View style={styles.productPrice}>
            <Text style={styles.priceText}>
              {product.price.toFixed(0)} FCFA
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderSalesChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.sectionTitle}>
        Évolution des ventes (7 derniers jours)
      </Text>
      <View style={styles.salesChart}>
        {salesData.map((day, index) => {
          const maxSales = Math.max(...salesData.map((d) => d.sales));
          const height = (day.sales / maxSales) * 100;
          return (
            <View key={day.date} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { height: `${height}%` }]} />
              </View>
              <Text style={styles.barLabel}>J{index + 1}</Text>
              <Text style={styles.barValue}>{day.sales}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analyses & Rapports</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderPeriodSelector()}
        {renderStatsCards()}
        {renderSalesChart()}
        {renderCategoryChart()}
        {renderTopProducts()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activePeriodButton: {
    backgroundColor: "#FF2A2A",
  },
  periodButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activePeriodButtonText: {
    color: "#fff",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  salesChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: "center",
  },
  barContainer: {
    height: 80,
    justifyContent: "flex-end",
    width: 20,
  },
  bar: {
    backgroundColor: "#FF2A2A",
    width: 20,
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  barValue: {
    fontSize: 10,
    color: "#333",
    fontWeight: "bold",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  categoryStats: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  categoryPercentage: {
    alignItems: "flex-end",
    minWidth: 60,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginTop: 4,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#FF2A2A",
    borderRadius: 2,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  productRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF2A2A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  productStats: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  productPrice: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF2A2A",
  },
});
