<template>
  <div>
    <UNotifications />

    <UContainer class="flex justify-center items-center h-screen">
      <UCard class="">
        <slot />
      </UCard>
    </UContainer>
  </div>
</template>
