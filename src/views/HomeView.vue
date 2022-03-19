<script setup>

import { ref, TransitionGroup } from 'vue';

let datas = ref('');
let title = ref('');
let sinposis = ref('');
let year = ref('');
let rank = ref('')
let img = ref('');
let aired = ref('');
let duration = ref('');
let genres = ref('');
let status = ref('');
let season = ref('');
let score = ref('');
let type = ref('');
let source = ref('');
let episodes = ref('');
let studios = ref('');
let themes = ref('');
let rating = ref('');
let loading = ref(false);
let loading2 = ref(false);


async function getData() {
  loading.value = true;
  const responses = await fetch("https://api.jikan.moe/v4/top/anime", {
    method: "GET",
  })
  const result = await responses.json();
  console.log(result);
  datas.value = result.data;
  loading.value = false;

}
async function getAnimebyID(id) {
  loading2.value = true;
  const responses = await fetch("https://api.jikan.moe/v4/anime/" + id, {
    method: "GET",
  })
  const result = await responses.json();
  console.log(result);
  title.value = result.data.title;
  sinposis.value = result.data.synopsis;
  img.value = result.data.images.webp.image_url;
  year.value = result.data.year;
  rank.value = result.data.rank;
  aired.value = result.data.aired.string;
  duration.value = result.data.duration;
  genres.value = result.data.genres;
  status.value = result.data.status;
  season.value = result.data.season;
  score.value = result.data.score;
  type.value = result.data.type;
  source.value = result.data.source;
  episodes.value = result.data.episodes;
  studios.value = result.data.studios;
  themes.value = result.data.themes;
  rating.value = result.data.rating;
  loading2.value = false;
  // console.log(genres.value);

}
getData()

</script>


<template>
  <div v-if="loading == true" class="flex justify-center bg-gray-900 items-center h-screen">
    <svg
      role="status"
      class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>

  <div v-else class="bg-gray-900 mx-auto h-full w-full flex item-stretch">
    <div class="h-almost mx-auto content self-center w-11/12 flex flex-wrap item-stretch">
      <h1 class="font-extrabold pt-4 text-4xl text-white mb-12 mt-12">Popular Anime</h1>

      <!-- <--------------CARD------------->
      -->
      <div class="anime-contain w-full h-5/6 container self-center">
        <ul class="inline" v-for="(data, index) in datas" :key="data">
          <li
            class="ml-5 mb-4 rounded-l-lg rounded-md inline-block"
            style="width:31.50%;height:230px;"
          >
            <div class="float-left object-contain">
              <img
                class="rounded-l-lg object-cover"
                style="width:100%;height:230px"
                v-bind:src="`${datas[index].images.webp.large_image_url}`"
              />
            </div>
            <div class="bg-white rounded-r-lg rounded-l-lg" style="width:100%;height:230px;">
              <div class="float-left p-4" style="width:185px; height:190px;">
                <h1 class="font-black line-clamp-2" style="font-size:15px">{{ datas[index].title }}</h1>
                <h2 v-if="`${datas[index].year}` == 'null'">unknown</h2>
                <h2 v-else>{{ datas[index].year }}</h2>
                <p
                  class="line-clamp-3"
                  style="font-size:10px;width:170px"
                >{{ datas[index].synopsis }}</p>
              </div>
              <button
                type="button"
                v-on:click="getAnimebyID(datas[index].mal_id)"
                @click="openModal"
                class="px-6 py-1 ml-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >Details</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- <------------------POP UP------------------->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto bg-black/[0.6]">
        <div
          v-if="loading2 == true"
          class="flex justify-center bg-black/[0.6] items-center h-screen"
        >
          <svg
            role="status"
            class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div v-else class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              style="width:50%"
              class="inline-block p-6 my-8 overflow-hidden text-justify align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <h1 class="text-lg leading-6 text-gray-900 mb-4 font-bold">{{ title }}</h1>
              <div class="float-left object-contain">
                <img class="rounded-lg" style="height:300px" v-bind:src="`${img}`" />
              </div>

              <div class="float-left px-4 font-medium" style="font-size:13.5px;width:60%">
                <p>Rank : {{ rank }}</p>
                <p v-if="`${year}` == 'null'">Year : unknown</p>
                <p v-else>Year : {{ year }}</p>
                <p>Aired : {{ aired }}</p>
                <p>Duration : {{ duration }}</p>
                <p>Episode : {{ episodes }}</p>
                <p>Status : {{ status }}</p>
                <p>Score : {{ score }}</p>
                <p>Type : {{ type }}</p>
                <p v-if="`${season}` == 'null'">Season : -</p>
                <p v-else>Season : {{ season }}</p>
                <p>Source : {{ source }}</p>
                <p>
                  Studios :
                  <span
                    class="inline"
                    v-for="(studio, index) in studios"
                    v-bind:key="studio"
                  >
                    <span>{{ studios[index].name }}&nbsp;&nbsp;</span>
                  </span>
                </p>
                <p>
                  Genres :
                  <span class="inline" v-for="(genre, index) in genres" v-bind:key="genre">
                    <span>{{ genres[index].name }}&nbsp;&nbsp;</span>
                  </span>
                </p>
                <p v-if="`${themes}` == []">Theme : -</p>
                <p v-else>
                  Themes :
                  <span class="inline" v-for="(theme, index) in themes" v-bind:key="theme">
                    <span>{{ themes[index].name }}&nbsp;&nbsp;</span>
                  </span>
                </p>

                <p>Rating : {{ rating }}</p>
              </div>
              <div class="mt-4 float-left">
                <h2 class="font-bold">Synopsis</h2>
                <p class="text-sm text-gray-500 mt-1" style="width:100%">{{ sinposis }}</p>
                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    @click="closeModal"
                  >close</button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>