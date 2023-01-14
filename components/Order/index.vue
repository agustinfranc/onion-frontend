<template>
  <div>
    <OrderHeader />

    <v-container>
      <OrderCommerceDetails class="mb-3" />

      <OrderPersonalDetails class="mb-3" />

      <OrderDeliveryDetails class="mb-3" />

      <OrderPayMethod />
    </v-container>

    <OrderActionButton />
  </div>
</template>
