

# Add Discount Code Support for Monthly Plan

## Overview
Allow users to enter a discount/promo code when subscribing to the Monthly ($89.99/mo) plan on the Estate Guru pricing page. The code will be validated by Stripe during checkout.

## Approach
Use Stripe's built-in `allow_promotion_codes: true` on the checkout session. This lets Stripe handle all coupon/promo code validation natively on the checkout page -- no custom input field needed on your site, and it works with any promotion code you create in Stripe's dashboard.

This is the simplest, most reliable approach: you create promotion codes in Stripe, and customers can enter them at checkout.

## Changes

### 1. Edge Function: `supabase/functions/create-estate-guru-checkout/index.ts`
- Accept an optional `couponCode` parameter from the request body
- For the **monthly** plan (non-promo): set `allow_promotion_codes: true` on the checkout session so users can enter any valid Stripe promotion code at checkout
- Keep the existing hardcoded TFA200 coupon logic for the annual promo plan unchanged
- Note: `allow_promotion_codes` and `discounts` are mutually exclusive in Stripe, so we only use `allow_promotion_codes` when no hardcoded discount is applied

### 2. Frontend: `src/components/estate-guru/EstateGuruPricing.tsx`
- No UI changes needed -- Stripe's checkout page will show the promo code input field automatically when `allow_promotion_codes` is enabled

## How to Create Promo Codes
After this change, you can create promotion codes in the Stripe Dashboard under **Products > Coupons > Promotion Codes**. Any valid promotion code will be accepted at monthly checkout.

## Files Changed
| File | Action |
|------|--------|
| `supabase/functions/create-estate-guru-checkout/index.ts` | Add `allow_promotion_codes: true` for monthly plan checkout sessions |
