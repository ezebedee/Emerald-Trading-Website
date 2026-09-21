import { z } from "zod";

import {
  ACCOUNT_CLASSIFICATIONS,
  CONTENT_STATUSES,
  CURRENCIES,
  MARKET_CATEGORIES,
  PERFORMANCE_CLASSIFICATIONS,
  RUNTIME_STATUSES,
  SYSTEM_LIFECYCLE_STATUSES,
  TRADING_PLATFORMS,
  VISIBILITIES,
} from "./types";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const currencySchema = z.enum(CURRENCIES);
export const moneyValueSchema = z.number().finite();
export const nonNegativeMoneyValueSchema = moneyValueSchema.nonnegative();
export const percentageValueSchema = z.number().finite();
export const percentageRateSchema = percentageValueSchema.min(0).max(100);

export const isoDateStringSchema = z
  .string()
  .regex(isoDatePattern, "Use ISO date format YYYY-MM-DD.");

export const isoDateTimeStringSchema = z
  .string()
  .datetime({ offset: true, message: "Use an ISO 8601 date-time string." });

export const readableIdSchema = z.string().min(1);
export const slugSchema = z
  .string()
  .regex(slugPattern, "Use lowercase words, digits, and hyphens only.");

export const accountClassificationSchema = z.enum(ACCOUNT_CLASSIFICATIONS);
export const performanceClassificationSchema = z.enum(
  PERFORMANCE_CLASSIFICATIONS,
);
export const visibilitySchema = z.enum(VISIBILITIES);
export const tradingPlatformSchema = z.enum(TRADING_PLATFORMS);
export const marketCategorySchema = z.enum(MARKET_CATEGORIES);
export const contentStatusSchema = z.enum(CONTENT_STATUSES);
export const systemLifecycleStatusSchema = z.enum(SYSTEM_LIFECYCLE_STATUSES);
export const runtimeStatusSchema = z.enum(RUNTIME_STATUSES);

export const instrumentSymbolSchema = z.string().trim().min(1).max(32);
export const assetReferenceIdSchema = readableIdSchema;
export const videoReferenceIdSchema = readableIdSchema;

export const accountReferenceSchema = z
  .object({
    accountClassification: accountClassificationSchema,
    brokerName: z.string().min(1).optional(),
    serverName: z.string().min(1).optional(),
    publicAccountNumber: z.string().min(1).optional(),
    currency: currencySchema.optional(),
    platform: tradingPlatformSchema.optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
