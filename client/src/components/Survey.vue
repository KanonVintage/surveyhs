<template>
  <div class="survey">
    <h1>Encuesta sobre pepas de cacao.</h1>

    <div v-for="survey in surveys">
      <p>
        <span><b>{{ survey.title }}</b></span><br />
        <span>{{ survey.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import SurveyService from '@/services/SurveyService'
export default {
  name: 'survey',
  data () {
    return {
        surveys: []
    }
  },
  mounted () {
    this.getSurvey()
  },
  methods: {
    async getSurvey () {
      const response = await SurveyService.fetchInfo()
      this.surveys = response.data
    }
  }
}
</script>


