<template>
  <v-row>
    <v-col v-show="showType === 'grid'" cols="12" md="4" lg="3" v-for="show in shows" :key="show.id">
      <v-card
        class="mx-auto pt-4">
        <v-img
          v-if="show.image && show.image.medium && show.image.original"
          height="300px"
          contain
          :lazy-src="show.image.medium"
          :src="show.image.original" />
        <v-img
          v-else
          class="white--text align-end"
          max-height="300px"
          contain
          src="/no-picture.jpg" />
        <v-card-title><n-link :to="`/show/${show.id}`">{{ show.name }}</n-link></v-card-title>
        <v-card-subtitle class="pb-0">
          <div v-if="show.genres.length">
            <strong>Genres:</strong>
            <v-chip
              v-for="(genre, gKey) in show.genres"
              :key="gKey"
              class="ma-1"
              small>
              {{ genre }}
            </v-chip>
          </div>
          <div v-if="show.language">
            <strong>Language:</strong> {{ show.language }}
          </div>
          <div v-if="show.status">
            <strong>Status:</strong> {{ show.status }}
          </div>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn nuxt :to="`/show/${show.id}`">View details</v-btn>
          <v-spacer></v-spacer>
          <v-rating
            v-model="show.prettyRating"
            background-color="white"
            color="yellow accent-4"
            half-increments
            readonly
            small />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-show="showType !== 'grid'" cols="12" class="mx-auto">
      <client-only>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Language</th>
              <th class="text-left">Genres</th>
              <th class="text-left">Status</th>
              <th class="text-left">Rating</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="show in shows" :key="show.id">
              <td>{{ show.name }}</td>
              <td>{{ show.language }}</td>
              <td>{{ show.genres.join(', ') }}</td>
              <td>{{ show.status }}</td>
              <td>
                <v-rating
                  v-model="show.prettyRating"
                  background-color="white"
                  color="yellow accent-4"
                  half-increments
                  readonly
                  small />
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </client-only>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    shows: {type: Array, default: () => ([]) },
    showType: {type: String, default: 'grid' },
  },
  data: () => ({}),
  methods: { },
}
</script>

<style>
</style>

