import { Text, View, Pressable, ScrollView } from "react-native";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

type Product = {
  _id: Id<"products">;
  product: string;
  price: number;
  quantity: number;
  emoji: string;
  category: string;
};

function ProductCard({
  product,
  onPurchase,
}: {
  product: Product;
  onPurchase: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Text style={{ fontSize: 40, marginRight: 12 }}>{product.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
            {product.product}
          </Text>
          <Text style={{ fontSize: 14, color: "#888", marginTop: 2 }}>
            {product.category}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#2a9d8f" }}>
            ${product.price.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            {product.quantity} in stock
          </Text>
        </View>

        <Pressable
          onPress={onPurchase}
          disabled={product.quantity === 0}
          style={{
            backgroundColor: product.quantity > 0 ? "#2a9d8f" : "#ccc",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            {product.quantity > 0 ? "Purchase" : "Out of Stock"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Index() {
  const products = useQuery(api.products.getProducts);
  const purchase = useMutation(api.products.purchase);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ padding: 16, paddingTop: 60 }}
    >
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onPurchase={() => purchase({ id: product._id })}
        />
      ))}
    </ScrollView>
  );
}
