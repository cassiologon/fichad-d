<template>
  <div v-if="show && race" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Escolher Atributo - {{ race.name }}</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <p>Esta raça concede +1 em uma característica à sua escolha. Selecione qual atributo receberá o bônus:</p>
        <div class="attributes-choice-grid">
          <div
            v-for="(value, attr) in character.attributes"
            :key="attr"
            class="attribute-choice-option"
            :class="{ 'selected': localSelectedAttribute === attr }"
            @click="localSelectedAttribute = attr"
          >
            <span class="attribute-choice-name">{{ formatAttributeName(attr) }}</span>
            <span class="attribute-choice-value">{{ value }}</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" @click="$emit('close')" class="btn-cancel">Cancelar</button>
        <button
          type="button"
          @click="handleConfirm"
          class="btn-confirm"
          :disabled="!localSelectedAttribute"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttributeChoiceModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    race: {
      type: Object,
      default: null
    },
    character: {
      type: Object,
      required: true
    },
    formatAttributeName: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      localSelectedAttribute: null
    }
  },
  methods: {
    handleConfirm() {
      if (this.localSelectedAttribute) {
        this.$emit('confirm', this.localSelectedAttribute)
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.localSelectedAttribute = null
      }
    },
    race() {
      if (this.race) {
        this.localSelectedAttribute = null
      }
    }
  }
}
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
}

.btn-close-modal {
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

.btn-close-modal:hover {
  background: #cbd5e0;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.attributes-choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.attribute-choice-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.attribute-choice-option:hover {
  border-color: #4299e1;
  background: #edf2f7;
}

.attribute-choice-option.selected {
  border-color: #4299e1;
  background: #bee3f8;
}

.attribute-choice-name {
  font-weight: 600;
  color: #2d3748;
}

.attribute-choice-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4299e1;
  background: #edf2f7;
  padding: 4px 12px;
  border-radius: 4px;
  min-width: 40px;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 2px solid #e2e8f0;
}

.btn-cancel {
  padding: 10px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #c53030;
}

.btn-confirm {
  padding: 10px 20px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-confirm:hover:not(:disabled) {
  background: #3182ce;
}

.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
    align-items: flex-end;
  }

  .modal-content {
    max-width: 100%;
    max-height: 95vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-header {
    padding: 15px;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .btn-close-modal {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 1.3rem;
  }

  .modal-body {
    padding: 15px;
  }

  .modal-body p {
    font-size: 0.95rem;
  }

  .attributes-choice-grid {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 15px;
  }

  .attribute-choice-option {
    padding: 12px;
    min-height: 60px;
  }

  .attribute-choice-name {
    font-size: 0.95rem;
  }

  .attribute-choice-value {
    font-size: 1.1rem;
    padding: 4px 10px;
  }

  .modal-footer {
    flex-direction: column-reverse;
    gap: 10px;
    padding: 15px;
    align-items: stretch;
  }

  .btn-cancel,
  .btn-confirm {
    width: 100%;
    min-height: 44px;
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-content {
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    padding: 12px;
  }

  .modal-header h2 {
    font-size: 1.1rem;
  }

  .btn-close-modal {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    font-size: 1.2rem;
  }

  .modal-body {
    padding: 12px;
  }

  .modal-body p {
    font-size: 0.9rem;
  }

  .attributes-choice-grid {
    gap: 8px;
    margin-top: 12px;
  }

  .attribute-choice-option {
    padding: 10px;
  }

  .attribute-choice-name {
    font-size: 0.9rem;
  }

  .attribute-choice-value {
    font-size: 1rem;
    padding: 4px 8px;
  }

  .modal-footer {
    padding: 12px;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
</style>

