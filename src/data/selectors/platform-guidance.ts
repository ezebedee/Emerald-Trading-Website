import {
  getProductPlatformImplementation,
  getPublicPlatformDefinitions,
  getPublicTradingProducts,
} from "./products";

export function getPlatformGuidanceMatrix() {
  const platforms = getPublicPlatformDefinitions();
  return {
    platforms,
    products: getPublicTradingProducts().map((product) => ({
      id: product.id,
      name: product.name,
      role: product.role,
      cells: platforms.map((platform) => {
        const implementation = getProductPlatformImplementation({
          productId: product.id,
          platformId: platform.id,
        });
        return {
          platformId: platform.id,
          availability: implementation?.availability ?? "not-documented",
          accessModel: implementation?.accessModel,
          documentationStatus: implementation?.documentationStatus,
          notes: implementation?.implementationNotes,
        };
      }),
    })),
  };
}

export function availabilityLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
