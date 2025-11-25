<template>
  <div
    v-if="item"
    class="popover-overlay"
    @click="$emit('close')"
  >
    <div class="popover-content" @click.stop>
      <div class="popover-header">
        <h3>{{ item.name }}</h3>
        <button
          type="button"
          @click="$emit('close')"
          class="popover-close-btn"
        >
          ×
        </button>
      </div>
      <div class="popover-body">
        <div class="popover-spell-info">
          <p><strong>Escola:</strong> {{ item.school }}</p>
          <p><strong>Custo:</strong> {{ item.cost }}</p>
          <p><strong>Alcance:</strong> {{ item.range }}</p>
          <p><strong>Duração:</strong> {{ item.duration }}</p>
          <p v-if="item.damage"><strong>Dano:</strong> {{ item.damage }}</p>
          <p v-if="item.requirements"><strong>Exigências:</strong> {{ item.requirements }}</p>
        </div>
        <div class="popover-description">
          <p
            v-for="(paragraph, index) in formatDescription(item.description)"
            :key="index"
            class="popover-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpellDescriptionPopover',
  props: {
    item: {
      type: Object,
      default: null
    },
    formatDescription: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.popover-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.popover-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.popover-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.popover-header h3 {
  margin: 0;
  color: #2d3748;
  font-size: 1.3rem;
}

.popover-close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.popover-close-btn:hover {
  background: #cbd5e0;
}

.popover-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.popover-spell-info {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.popover-spell-info p {
  margin: 8px 0;
  color: #4a5568;
}

.popover-description {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.6;
}

.popover-paragraph {
  margin: 0 0 1em 0;
  text-align: justify;
}

.popover-paragraph:last-child {
  margin-bottom: 0;
}
</style>

