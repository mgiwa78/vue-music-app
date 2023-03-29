<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times fl"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center-font-bold p-4 m-4"
        v-if="show_alert"
        :class="alert_varient"
      ></div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, auth, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  data() {
    return {
      showForm: false,
      in_submission: false,
      show_alert: false,
      alert_varient: 'bg-blue-500',
      alert_message: 'Please wait, uploading song info!',
      schema: { modified_name: 'required', genre: 'alphaSpaces' }
    }
  },
  props: {
    song: { type: Object, required: true },
    updateSong: { type: Function, required: true },
    removeSong: { type: Function, required: true },
    updateUnsavedFlag: { type: Function },
    index: { type: Number, required: true }
  },
  methods: {
    async edit(values) {
      this.in_submission = true
      this.show_alert = true
      this.alert_varient = 'bg-blue-500'
      this.alert_message = 'Please wait, uploading song info!'

      try {
        await songsCollection.doc(this.song.docID).update(values)
      } catch (error) {
        this.in_submission = false
        this.show_alert = true
        this.alert_varient = 'bg-red-500'
        this.alert_message = 'Sonthing went wrong, Try again later!'
        return
      }
      this.updateSong(this.index, values)
      this.in_submission = false
      this.show_alert = true
      this.alert_varient = 'bg-green-500'
      this.alert_message = 'Success'

      this.updateUnsavedFlag(false)
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)
      await songRef.delete()

      await songsCollection.doc(this.song.docID).delete()

      this.removeSong(this.index)
    }
  }
}
</script>

<style lang="scss" scoped></style>
