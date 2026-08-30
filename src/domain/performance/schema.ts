import { z } from "zod";

import {
  accountClassificationSchema,
  accountReferenceSchema,
  assetReferenceIdSchema,
  currencySchema,
  isoDateStringSchema,
  isoDateTimeStringSchema,
  marketCategorySchema,
  moneyValueSchema,
  nonNegativeMoneyValueSchema,
  percentageRateSchema,
  performanceClassificationSchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";
import { PERFORMANCE_PERIOD_TYPES } from "./types";

const nonNegativeIntegerSchema = z.number().int().nonnegative();

export const performancePeriodTypeSchema = z.enum(PERFORMANCE_PERIOD_TYPES);

export const performanceMetricsSchema = z
  .object({
    netProfit: moneyValueSchema,
    grossProfit: nonNegativeMoneyValueSchema,
    grossLoss: nonNegativeMoneyValueSchema,
    returnPct: moneyValueSchema,
    startingBalance: moneyValueSchema,
    endingBalance: moneyValueSchema,
    equity: moneyValueSchema,
    totalTrades: nonNegativeIntegerSchema,
    winningTrades: nonNegativeIntegerSchema,
    losingTrades: nonNegativeIntegerSchema,
    breakevenTrades: nonNegativeIntegerSchema.optional(),
    winRatePct: percentageRateSchema,
    profitFactor: z.number().finite().nonnegative().nullable().optional(),
    maxDrawdownAmount: nonNegativeMoneyValueSchema,
    maxDrawdownPct: percentageRateSchema,
    expectedPayoff: moneyValueSchema.optional(),
    largestWinningTrade: moneyValueSchema.optional(),
    largestLosingTrade: moneyValueSchema.optional(),
    averageWinningTrade: moneyValueSchema.optional(),
    averageLosingTrade: moneyValueSchema.optional(),
    shortTrades: nonNegativeIntegerSchema.optional(),
    longTrades: nonNegativeIntegerSchema.optional(),
    shortWinRatePct: percentageRateSchema.optional(),
    longWinRatePct: percentageRateSchema.optional(),
    floatingPnl: moneyValueSchema.optional(),
    commission: moneyValueSchema.optional(),
    swap: moneyValueSchema.optional(),
    fees: moneyValueSchema.optional(),
  })
  .strict()
  .superRefine((metrics, context) => {
    if (metrics.winningTrades > metrics.totalTrades) {
      context.addIssue({
        code: "custom",
        path: ["winningTrades"],
        message: "winningTrades cannot exceed totalTrades.",
      });
    }

    if (metrics.losingTrades > metrics.totalTrades) {
      context.addIssue({
        code: "custom",
        path: ["losingTrades"],
        message: "losingTrades cannot exceed totalTrades.",
      });
    }

    const breakevenTrades = metrics.breakevenTrades ?? 0;
    if (
      metrics.winningTrades + metrics.losingTrades + breakevenTrades >
      metrics.totalTrades
    ) {
      context.addIssue({
        code: "custom",
        path: ["totalTrades"],
        message:
          "winningTrades, losingTrades, and breakevenTrades cannot exceed totalTrades.",
      });
    }
  });

export const performanceRecordSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    periodType: performancePeriodTypeSchema,
    startDate: isoDateStringSchema,
    endDate: isoDateStringSchema,
    accountClassification: accountClassificationSchema,
    performanceClassification: performanceClassificationSchema,
    visibility: visibilitySchema,
    currency: currencySchema.optional(),
    marketCategories: z.array(marketCategorySchema).optional(),
    account: accountReferenceSchema.optional(),
    periodMetrics: performanceMetricsSchema,
    cumulativeMetrics: performanceMetricsSchema.optional(),
    thumbnailAssetId: assetReferenceIdSchema.optional(),
    statementAssetId: assetReferenceIdSchema.optional(),
    platformAssetId: assetReferenceIdSchema.optional(),
    notes: z.string().min(1).optional(),
    createdAt: isoDateTimeStringSchema.optional(),
    updatedAt: isoDateTimeStringSchema.optional(),
  })
  .strict()
  .refine((record) => record.startDate <= record.endDate, {
    path: ["endDate"],
    message: "endDate must be the same as or later than startDate.",
  });
