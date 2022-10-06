<script setup lang="ts"></script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h5">安裝教學</div>
      <div class="text-subtitle2">
        此為一個 Progessive Web
        App，可在Windows，MacOS，iOS，Android上以瀏覽器安裝到裝置上。無需使用App
        Store/Google Play等。BRC會在每次開啓時自動更新，無需手動更新。
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="text-h6">iOS</div>
      <div class="text-subtitle2">注意：必需使用 Safari</div>
      <div class="text-body1">
        <ol>
          <li>
            <div class="row items-center">
              <div>點擊「分享」按鈕</div>
              <q-icon size="2rem" name="ios_share" color="blue"></q-icon>
            </div>
          </li>
          <li>點擊「新增至主畫面」</li>
          <li>點擊「新增」</li>
        </ol>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="text-h6">Android</div>
      <div class="text-subtitle2">注意：必需使用 Google Chrome</div>
      <div class="text-body1">
        <ol>
          <li>
            <div class="row items-center">
              <div>點擊「菜單」按鈕</div>
              <q-icon size="2rem" name="more_vert"></q-icon>
            </div>
          </li>
          <li>點擊「新增至主畫面」</li>
          <li>點擊「新增」</li>
        </ol>
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="text-h6">其他系統</div>
    </q-card-section>
    <q-card-section>
      步驟類同。請參考瀏覽器的「新增至桌面」/「Install this as App」 功能。
    </q-card-section>
  </q-card>
</template>
