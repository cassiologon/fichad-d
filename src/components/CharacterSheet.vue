<template>
  <div class="character-sheet">
    <div class="sheet-header">
      <h1>Ficha de Personagem</h1>
      <div class="points-control">
        <label for="total-points">Pontos Disponíveis:</label>
        <input
          id="total-points"
          type="number"
          v-model.number="totalPoints"
          min="0"
          @input="updateTotalPoints"
          class="points-input"
        />
        <div class="points-remaining">
          Pontos Restantes: <span :class="{ 'negative': remainingPoints < 0 }">{{ remainingPoints }}</span>
        </div>
      </div>
    </div>

    <div class="sheet-content">
      <!-- Informações Básicas -->
      <section class="sheet-section">
        <h2>Informações Básicas</h2>
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input
              id="name"
              type="text"
              v-model="character.name"
              @input="saveToCookie"
              placeholder="Nome do personagem"
            />
          </div>
          <div class="form-group">
            <label for="experience-points">Pontos de Experiência (PEs):</label>
            <input
              id="experience-points"
              type="number"
              v-model.number="character.experiencePoints"
              @input="saveToCookie"
              min="0"
              placeholder="0"
            />
            <small>10 PEs = 1 ponto de personagem (use PEs para evoluir o personagem)</small>
            <small v-if="character.experiencePoints >= 10" class="pe-conversion">
              Você pode converter {{ Math.floor(character.experiencePoints / 10) }} ponto(s) de PEs
            </small>
          </div>
        </div>
      </section>

      <!-- Atributos -->
      <section class="sheet-section">
        <h2>Atributos</h2>
        <div class="attributes-grid">
          <div
            v-for="(value, attr) in character.attributes"
            :key="attr"
            class="attribute-item"
          >
            <div class="attribute-header">
              <label :for="attr">{{ formatAttributeName(attr) }}:</label>
              <div class="attribute-value">{{ value }}</div>
            </div>
            <div class="attribute-controls">
              <button
                type="button"
                @click="decreaseAttribute(attr)"
                :disabled="value <= 0"
                class="btn-control btn-decrease"
              >
                -
              </button>
              <input
                :id="attr"
                type="number"
                v-model.number="character.attributes[attr]"
                @input="updateAttribute(attr)"
                min="0"
                max="5"
                class="attribute-input"
              />
              <button
                type="button"
                @click="increaseAttribute(attr)"
                :disabled="remainingPoints <= 0 || value >= 5"
                class="btn-control btn-increase"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <!-- PVs e PMs -->
        <div class="pv-pm-display">
          <div class="pv-pm-item">
            <strong>Pontos de Vida (PVs):</strong> 
            <span class="pv-pm-value">{{ calculatedPVs }}</span>
          </div>
          <div class="pv-pm-item">
            <strong>Pontos de Magia (PMs):</strong> 
            <span class="pv-pm-value">{{ calculatedPMs }}</span>
          </div>
        </div>
      </section>

      <!-- Grid de Seções: Raça, Vantagens, Desvantagens e Perícias -->
      <div class="sections-grid">
        <!-- Vantagem Única (Raça) -->
        <section class="sheet-section">
          <div class="section-header-with-button">
            <h2>Raça (Vantagem Única)</h2>
            <button type="button" @click="showUniqueAdvantageModal = true" class="btn-add-advantage">
              {{ character.uniqueAdvantage ? 'Alterar Raça' : 'Selecionar Raça' }}
            </button>
          </div>
          <div v-if="character.uniqueAdvantage" class="unique-advantage-display">
            <div class="advantage-item">
              <span class="advantage-name">{{ character.uniqueAdvantage.name }}</span>
              <span class="advantage-cost">{{ character.uniqueAdvantage.cost }} pts</span>
              <span class="advantage-group">{{ character.uniqueAdvantage.group }}</span>
              <button
                type="button"
                @click="removeUniqueAdvantage"
                class="btn-remove-advantage"
                title="Remover raça"
              >
                ×
              </button>
            </div>
            <div v-if="character.uniqueAdvantage.description" class="advantage-description">
              {{ character.uniqueAdvantage.description }}
            </div>
          </div>
          <div v-else class="no-advantages">
            Nenhuma raça selecionada. Você será considerado Humano.
          </div>
        </section>

        <!-- Vantagens -->
        <section class="sheet-section">
          <div class="section-header-with-button">
            <h2>Vantagens</h2>
            <button type="button" @click="showAdvantagesModal = true" class="btn-add-advantage">
              + Adicionar Vantagem
            </button>
          </div>
          <div v-if="character.advantages && character.advantages.length > 0" class="advantages-list-main">
            <div
              v-for="(advantage, index) in character.advantages"
              :key="index"
              class="advantage-item"
            >
              <div class="advantage-info">
                <span class="advantage-name">
                  {{ advantage.name }}
                  <span v-if="advantage.quantity && advantage.quantity > 1" class="quantity-badge">x{{ advantage.quantity }}</span>
                </span>
                <span class="advantage-cost">{{ getAdvantageTotalCost(advantage) }} pts</span>
                <div v-if="advantage.selectedModifiers && advantage.selectedModifiers.length > 0" class="advantage-modifiers">
                  <span class="modifiers-label">Modificadores:</span>
                  <span
                    v-for="(modId, modIndex) in advantage.selectedModifiers"
                    :key="modIndex"
                    class="modifier-badge"
                  >
                    {{ getModifierName(advantage.name, modId) }}
                  </span>
                </div>
              </div>
              <button
                type="button"
                @click="removeAdvantage(index)"
                class="btn-remove-advantage"
                title="Remover vantagem"
              >
                ×
              </button>
            </div>
          </div>
          <div v-else class="no-advantages">
            Nenhuma vantagem selecionada. Clique em "Adicionar Vantagem" para começar.
          </div>
        </section>

        <!-- Desvantagens -->
        <section class="sheet-section">
          <div class="section-header-with-button">
            <h2>Desvantagens</h2>
            <button type="button" @click="showDisadvantagesModal = true" class="btn-add-advantage">
              + Adicionar Desvantagem
            </button>
          </div>
          <div v-if="character.disadvantages && character.disadvantages.length > 0" class="advantages-list-main">
            <div
              v-for="(disadvantage, index) in character.disadvantages"
              :key="index"
              class="advantage-item"
            >
              <span class="advantage-name">{{ disadvantage.name }}</span>
              <span class="advantage-cost">{{ disadvantage.cost }} pts</span>
              <button
                type="button"
                @click="removeDisadvantage(index)"
                class="btn-remove-advantage"
                title="Remover desvantagem"
              >
                ×
              </button>
            </div>
          </div>
          <div v-else class="no-advantages">
            Nenhuma desvantagem selecionada. Clique em "Adicionar Desvantagem" para começar.
          </div>
        </section>

        <!-- Perícias -->
        <section class="sheet-section">
          <div class="section-header-with-button">
            <h2>Perícias</h2>
            <button type="button" @click="showSkillsModal = true" class="btn-add-advantage">
              + Adicionar Perícia
            </button>
          </div>
          <div v-if="character.skills && character.skills.length > 0" class="advantages-list-main">
            <div
              v-for="(skill, index) in character.skills"
              :key="index"
              class="advantage-item"
            >
              <span class="advantage-name">
                <span v-if="skill.type === 'full'">{{ skill.name }}</span>
                <span v-else-if="skill.type === 'specializations'">
                  3 Especializações: {{ skill.specializations.join(', ') }}
                </span>
                <span v-else>{{ skill.name }}</span>
              </span>
              <span class="advantage-cost" v-if="skill.cost !== undefined">{{ skill.cost }} pts</span>
              <button
                type="button"
                @click="removeSkill(index)"
                class="btn-remove-advantage"
                title="Remover perícia"
              >
                ×
              </button>
            </div>
          </div>
          <div v-else class="no-advantages">
            Nenhuma perícia selecionada. Clique em "Adicionar Perícia" para começar.
          </div>
        </section>
      </div>

      <!-- Informações Adicionais -->
      <section class="sheet-section">
        <h2>Informações Adicionais</h2>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="background">História/Background:</label>
            <textarea
              id="background"
              v-model="character.background"
              @input="saveToCookie"
              rows="4"
              placeholder="História do personagem..."
            ></textarea>
          </div>
          <div class="form-group full-width">
            <label for="notes">Anotações:</label>
            <textarea
              id="notes"
              v-model="character.notes"
              @input="saveToCookie"
              rows="3"
              placeholder="Anotações adicionais..."
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Botão Reset -->
      <div class="sheet-actions">
        <button type="button" @click="resetSheet" class="btn-reset">
          Resetar Ficha
        </button>
      </div>
    </div>

    <!-- Modal de Vantagens -->
    <div v-if="showAdvantagesModal" class="modal-overlay" @click.self="showAdvantagesModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Selecionar Vantagens</h2>
          <button type="button" @click="showAdvantagesModal = false" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              type="text"
              v-model="advantageSearch"
              placeholder="Buscar vantagem..."
              class="search-input"
            />
          </div>
          <div class="advantages-grid">
            <div
              v-for="advantage in filteredAdvantages"
              :key="advantage.name"
              class="advantage-option"
              :class="{ 'selected': isAdvantageSelected(advantage.name), 'disabled': !canAffordAdvantage(advantage) }"
              @click="toggleAdvantage(advantage)"
            >
              <div class="advantage-option-header">
                <div class="advantage-option-name-wrapper">
                  <span class="advantage-option-name">{{ advantage.name }}</span>
                  <button
                    v-if="advantage.description"
                    type="button"
                    class="advantage-info-btn"
                    @click.stop="showAdvantageDescription(advantage)"
                    title="Ver descrição completa"
                  >
                    🔍
                  </button>
                </div>
                <span class="advantage-option-cost">{{ advantage.cost }} pts</span>
              </div>
              <div v-if="advantage.summary" class="advantage-option-summary">
                {{ advantage.summary }}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-points-info">
            Pontos gastos em vantagens: <strong>{{ advantagesCost }}</strong>
          </div>
          <button type="button" @click="showAdvantagesModal = false" class="btn-close">
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Desvantagens -->
    <div v-if="showDisadvantagesModal" class="modal-overlay" @click.self="showDisadvantagesModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Selecionar Desvantagens</h2>
          <button type="button" @click="showDisadvantagesModal = false" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              type="text"
              v-model="disadvantageSearch"
              placeholder="Buscar desvantagem..."
              class="search-input"
            />
          </div>
          <div class="advantages-grid">
            <div
              v-for="disadvantage in filteredDisadvantages"
              :key="disadvantage.name"
              class="advantage-option"
              :class="{ 'selected': isDisadvantageSelected(disadvantage.name) }"
              @click="toggleDisadvantage(disadvantage)"
            >
              <div class="advantage-option-header">
                <div class="advantage-option-name-wrapper">
                  <span class="advantage-option-name">{{ disadvantage.name }}</span>
                  <button
                    v-if="disadvantage.description"
                    type="button"
                    class="advantage-info-btn"
                    @click.stop="showDisadvantageDescription(disadvantage)"
                    title="Ver descrição completa"
                  >
                    🔍
                  </button>
                </div>
                <span class="advantage-option-cost">{{ disadvantage.cost }} pts</span>
              </div>
              <div v-if="disadvantage.summary" class="advantage-option-summary">
                {{ disadvantage.summary }}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-points-info">
            Pontos ganhos com desvantagens: <strong>{{ disadvantagesCost }}</strong>
          </div>
          <button type="button" @click="showDisadvantagesModal = false" class="btn-close">
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Popover de Descrição de Desvantagem -->
    <div
      v-if="selectedDisadvantageForDescription"
      class="popover-overlay"
      @click="closeDisadvantageDescription"
    >
      <div class="popover-content" @click.stop>
        <div class="popover-header">
          <h3>{{ selectedDisadvantageForDescription.name }}</h3>
          <button
            type="button"
            @click="closeDisadvantageDescription"
            class="popover-close-btn"
          >
            ×
          </button>
        </div>
        <div class="popover-body">
          <div class="popover-description">
            <p
              v-for="(paragraph, index) in formatDescription(selectedDisadvantageForDescription.description)"
              :key="index"
              class="popover-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Vantagens Únicas -->
    <div v-if="showUniqueAdvantageModal" class="modal-overlay" @click.self="showUniqueAdvantageModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Selecionar Vantagem Única (Raça)</h2>
          <button type="button" @click="showUniqueAdvantageModal = false" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              type="text"
              v-model="uniqueAdvantageSearch"
              placeholder="Buscar raça..."
              class="search-input"
            />
          </div>
          <div class="advantages-grid">
            <div
              v-for="uniqueAdv in filteredUniqueAdvantages"
              :key="uniqueAdv.name"
              class="advantage-option"
              :class="{ 'selected': character.uniqueAdvantage && character.uniqueAdvantage.name === uniqueAdv.name, 'disabled': !canAffordUniqueAdvantage(uniqueAdv) }"
              @click="selectUniqueAdvantage(uniqueAdv)"
            >
              <div class="advantage-option-header">
                <div class="advantage-option-name-wrapper">
                  <span class="advantage-option-name">{{ uniqueAdv.name }}</span>
                  <button
                    v-if="uniqueAdv.fullDescription"
                    type="button"
                    class="advantage-info-btn"
                    @click.stop="showUniqueAdvantageDescription(uniqueAdv)"
                    title="Ver descrição completa"
                  >
                    🔍
                  </button>
                </div>
                <span class="advantage-option-cost">{{ uniqueAdv.cost }} pts</span>
              </div>
              <div class="advantage-option-group">{{ uniqueAdv.group }}</div>
              <div v-if="uniqueAdv.description" class="advantage-option-description">{{ uniqueAdv.description }}</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="showUniqueAdvantageModal = false" class="btn-close">
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Perícias -->
    <div v-if="showSkillsModal" class="modal-overlay" @click.self="closeSkillsModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Selecionar Perícias</h2>
          <button type="button" @click="closeSkillsModal" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <!-- Seleção de modo: Perícia Completa ou Especializações -->
          <div class="skills-mode-selector">
            <button
              type="button"
              @click="skillsMode = 'full'"
              :class="['mode-button', { 'active': skillsMode === 'full' }]"
            >
              Perícia Completa (2 pts)
            </button>
            <button
              type="button"
              @click="skillsMode = 'specializations'"
              :class="['mode-button', { 'active': skillsMode === 'specializations' }]"
            >
              3 Especializações (1 pt)
            </button>
          </div>

          <!-- Modo: Perícia Completa -->
          <div v-if="skillsMode === 'full'" class="skills-full-mode">
            <div class="search-box">
              <input
                type="text"
                v-model="skillSearch"
                placeholder="Buscar perícia..."
                class="search-input"
              />
            </div>
            <div class="advantages-grid">
              <div
                v-for="skill in filteredSkills"
                :key="skill.name"
                class="advantage-option"
                :class="{ 
                  'selected': isFullSkillSelected(skill.name),
                  'disabled': !canAffordSkill(skill, 'full')
                }"
                @click="toggleFullSkill(skill)"
              >
                <div class="advantage-option-header">
                  <span class="advantage-option-name">{{ skill.name }}</span>
                  <span class="advantage-option-cost">2 pts</span>
                </div>
                <div v-if="skill.description" class="advantage-option-description">{{ skill.description }}</div>
              </div>
            </div>
          </div>

          <!-- Modo: Especializações -->
          <div v-if="skillsMode === 'specializations'" class="skills-specializations-mode">
            <div class="search-box">
              <input
                type="text"
                v-model="specializationSearch"
                placeholder="Buscar especialização..."
                class="search-input"
              />
            </div>
            <div class="specializations-counter">
              Especializações selecionadas: <strong>{{ selectedSpecializations.length }}/3</strong>
            </div>
            <div class="specializations-list">
              <div
                v-for="skill in allSkills"
                :key="skill.name"
                class="skill-group"
              >
                <h3 class="skill-group-title">{{ skill.name }}</h3>
                <div class="specializations-grid">
                  <label
                    v-for="spec in getFilteredSpecializations(skill)"
                    :key="spec"
                    class="specialization-item"
                    :class="{ 
                      'disabled': !canSelectSpecialization(spec),
                      'already-acquired': isSpecializationAlreadyAcquired(spec)
                    }"
                  >
                    <input
                      type="checkbox"
                      :value="spec"
                      :checked="isSpecializationSelected(spec)"
                      :disabled="!canSelectSpecialization(spec)"
                      @change="toggleSpecialization(spec, skill.name)"
                    />
                    <span class="specialization-name">
                      {{ spec }}
                      <span v-if="isSpecializationAlreadyAcquired(spec)" class="already-acquired-badge">(já adquirida)</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="specializations-actions">
              <button
                type="button"
                @click="confirmSpecializations"
                :disabled="selectedSpecializations.length !== 3 || !canAffordSpecializations"
                class="btn-confirm-specializations"
              >
                Confirmar 3 Especializações (1 pt)
              </button>
              <button
                type="button"
                @click="clearSpecializations"
                class="btn-clear-specializations"
              >
                Limpar Seleção
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-points-info">
            Pontos gastos em perícias: <strong>{{ skillsCost }}</strong>
          </div>
          <button type="button" @click="closeSkillsModal" class="btn-close">
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Popover de Descrição de Vantagem -->
    <div
      v-if="selectedAdvantageForDescription"
      class="popover-overlay"
      @click="closeAdvantageDescription"
    >
      <div class="popover-content" @click.stop>
        <div class="popover-header">
          <h3>{{ selectedAdvantageForDescription.name }}</h3>
          <button
            type="button"
            @click="closeAdvantageDescription"
            class="popover-close-btn"
          >
            ×
          </button>
        </div>
        <div class="popover-body">
          <div class="popover-description">
            <p
              v-for="(paragraph, index) in formatDescription(selectedAdvantageForDescription.description)"
              :key="index"
              class="popover-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Quantidade de Vantagem -->
    <div v-if="showQuantityModal && advantageForQuantity" class="modal-overlay" @click.self="closeQuantityModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Adicionar {{ advantageForQuantity.name }}</h2>
          <button type="button" @click="closeQuantityModal" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="quantity-info">
            <p><strong>Custo por unidade:</strong> {{ advantageForQuantity.cost }} pontos</p>
            <p><strong>Custo total:</strong> {{ (advantageForQuantity.cost || 0) * advantageQuantity }} pontos</p>
            <p v-if="!canAffordAdvantageWithQuantity()" class="error-message">
              Pontos insuficientes. Você precisa de {{ (advantageForQuantity.cost || 0) * advantageQuantity }} pontos, mas tem apenas {{ remainingPoints }}.
            </p>
          </div>
          <div class="quantity-selector">
            <label>Quantidade:</label>
            <div class="quantity-controls">
              <button type="button" @click="decreaseQuantity" class="btn-quantity" :disabled="advantageQuantity <= 1">−</button>
              <input
                type="number"
                v-model.number="advantageQuantity"
                min="1"
                class="quantity-input"
              />
              <button type="button" @click="increaseQuantity" class="btn-quantity">+</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="closeQuantityModal" class="btn-cancel">Cancelar</button>
          <button
            type="button"
            @click="confirmAdvantageWithQuantity"
            class="btn-confirm"
            :disabled="!canAffordAdvantageWithQuantity()"
          >
            Confirmar ({{ (advantageForQuantity.cost || 0) * advantageQuantity }} pts)
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Modificadores de Vantagem -->
    <div v-if="showModifiersModal && advantageForModifiers" class="modal-overlay" @click.self="closeModifiersModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Configurar {{ advantageForModifiers.name }}</h2>
          <button type="button" @click="closeModifiersModal" class="btn-close-modal">×</button>
        </div>
        <div class="modal-body">
          <div class="modifiers-info">
            <p v-if="selectedModifiers.length === 0"><strong>Custo base:</strong> {{ advantageForModifiers.cost }} pontos</p>
            <p v-else><strong>Custo por unidade:</strong> {{ calculateAdvantageCostWithModifiers(advantageForModifiers, selectedModifiers) }} pontos</p>
            <div v-if="advantageForModifiers.purchasableMultiple" class="quantity-selector-inline">
              <label>Quantidade:</label>
              <div class="quantity-controls">
                <button type="button" @click="decreaseQuantity" class="btn-quantity" :disabled="advantageQuantity <= 1">−</button>
                <input
                  type="number"
                  v-model.number="advantageQuantity"
                  min="1"
                  class="quantity-input"
                />
                <button type="button" @click="increaseQuantity" class="btn-quantity">+</button>
              </div>
            </div>
            <p><strong>Custo total:</strong> {{ calculateAdvantageCostWithModifiers(advantageForModifiers, selectedModifiers) * (advantageForModifiers.purchasableMultiple ? advantageQuantity : 1) }} pontos</p>
            <p v-if="!canAffordAdvantageWithModifiers()" class="error-message">
              Pontos insuficientes. Você precisa de {{ calculateAdvantageCostWithModifiers(advantageForModifiers, selectedModifiers) * (advantageForModifiers.purchasableMultiple ? advantageQuantity : 1) }} pontos, mas tem apenas {{ remainingPoints }}.
            </p>
          </div>
          <div class="modifiers-list">
            <h3>Modificadores Disponíveis</h3>
            <div
              v-for="modifier in advantageForModifiers.modifiers"
              :key="modifier.id"
              class="modifier-option"
              :class="{ 'selected': isModifierSelected(modifier.id) }"
              @click="toggleModifier(modifier.id)"
            >
              <div class="modifier-header">
                <div class="modifier-name-wrapper">
                  <input
                    type="checkbox"
                    :checked="isModifierSelected(modifier.id)"
                    @change="toggleModifier(modifier.id)"
                    @click.stop
                  />
                  <span class="modifier-name">{{ modifier.name }}</span>
                </div>
                <div class="modifier-cost">
                  <span v-if="modifier.costModifier !== 0" class="cost-modifier">
                    {{ modifier.costModifier > 0 ? '+' : '' }}{{ modifier.costModifier }} pts
                  </span>
                  <span v-if="modifier.pmModifier !== 0 && modifier.pmModifier !== undefined" class="pm-modifier">
                    {{ modifier.pmModifier > 0 ? '+' : '' }}{{ modifier.pmModifier }} PM
                  </span>
                </div>
              </div>
              <div class="modifier-description">
                {{ modifier.description }}
              </div>
              <div v-if="modifier.restrictions && modifier.restrictions.includes('pdfOnly')" class="modifier-restriction">
                ⚠️ Apenas para ataques com Poder de Fogo (PdF)
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="closeModifiersModal" class="btn-cancel">Cancelar</button>
          <button
            type="button"
            @click="confirmAdvantageWithModifiers"
            class="btn-confirm"
            :disabled="!canAffordAdvantageWithModifiers()"
          >
            Confirmar ({{ calculateAdvantageCostWithModifiers(advantageForModifiers, selectedModifiers) * (advantageForModifiers.purchasableMultiple ? advantageQuantity : 1) }} pts)
          </button>
        </div>
      </div>
    </div>

    <!-- Popover de Descrição de Vantagem Única (Raça) -->
    <div
      v-if="selectedUniqueAdvantageForDescription"
      class="popover-overlay"
      @click="closeUniqueAdvantageDescription"
    >
      <div class="popover-content" @click.stop>
        <div class="popover-header">
          <h3>{{ selectedUniqueAdvantageForDescription.name }}</h3>
          <button
            type="button"
            @click="closeUniqueAdvantageDescription"
            class="popover-close-btn"
          >
            ×
          </button>
        </div>
        <div class="popover-body">
          <div class="popover-description">
            <p
              v-for="(paragraph, index) in formatDescription(selectedUniqueAdvantageForDescription.fullDescription)"
              :key="index"
              class="popover-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookieObject, setCookieObject } from '../utils/cookieUtils'
import { advantages } from '../data/advantages'
import { disadvantages } from '../data/disadvantages'
import { skills } from '../data/skills'
import { uniqueAdvantages } from '../data/uniqueAdvantages'

const COOKIE_NAME = 'character_sheet_data'

export default {
  name: 'CharacterSheet',
  data() {
    return {
      totalPoints: 0,
      showAdvantagesModal: false,
      showDisadvantagesModal: false,
      showSkillsModal: false,
      showUniqueAdvantageModal: false,
      advantageSearch: '',
      disadvantageSearch: '',
      skillSearch: '',
      uniqueAdvantageSearch: '',
      selectedAdvantageForDescription: null,
      selectedDisadvantageForDescription: null,
      selectedUniqueAdvantageForDescription: null,
      skillsMode: 'full', // 'full' ou 'specializations'
      selectedSpecializations: [], // Array temporário para especializações sendo selecionadas
      specializationSearch: '',
      showModifiersModal: false,
      advantageForModifiers: null, // Vantagem que está sendo configurada com modificadores
      selectedModifiers: [], // IDs dos modificadores selecionados temporariamente
      showQuantityModal: false,
      advantageForQuantity: null, // Vantagem que está sendo configurada com quantidade
      advantageQuantity: 1, // Quantidade selecionada temporariamente
      character: {
        name: '',
        attributes: {
          forca: 0,
          habilidade: 0,
          resistencia: 0,
          armadura: 0,
          poderDeFogo: 0
        },
        advantages: [],
        disadvantages: [],
        uniqueAdvantage: null,
        skills: [],
        experiencePoints: 0,
        background: '',
        notes: ''
      }
    }
  },
  computed: {
    calculatedPVs() {
      const resistencia = this.character.attributes.resistencia || 0
      if (resistencia === 0) return 1
      return resistencia * 5
    },
    calculatedPMs() {
      const resistencia = this.character.attributes.resistencia || 0
      if (resistencia === 0) return 1
      return resistencia * 5
    },
    remainingPoints() {
      const usedPoints = Object.values(this.character.attributes).reduce(
        (sum, value) => sum + value,
        0
      )
      const advantagesCost = this.advantagesCost
      const disadvantagesCost = this.disadvantagesCost
      const uniqueAdvantageCost = this.uniqueAdvantageCost
      const skillsCost = this.skillsCost
      
      // Desvantagens dão pontos (valores negativos aumentam pontos disponíveis)
      return this.totalPoints - usedPoints - advantagesCost - uniqueAdvantageCost - skillsCost + Math.abs(disadvantagesCost)
    },
    advantagesCost() {
      if (!this.character.advantages) return 0
      return this.character.advantages.reduce((sum, adv) => {
        let singleCost = 0
        
        // Se houver modificadores selecionados, usa apenas a soma dos modificadores
        if (adv.selectedModifiers && adv.selectedModifiers.length > 0) {
          const originalAdvantage = advantages.find(a => a.name === adv.name)
          if (originalAdvantage && originalAdvantage.modifiers) {
            const modifierCost = adv.selectedModifiers.reduce((modSum, modId) => {
              const modifier = originalAdvantage.modifiers.find(m => m.id === modId)
              return modSum + (modifier ? modifier.costModifier : 0)
            }, 0)
            singleCost = Math.max(1, modifierCost) // Mínimo de 1 ponto
          }
        } else {
          // Se não houver modificadores, usa o custo base
          const baseCost = adv.cost || 0
          singleCost = Math.max(1, baseCost) // Mínimo de 1 ponto
        }
        
        // Multiplicar pela quantidade se houver
        const quantity = adv.quantity || 1
        return sum + (singleCost * quantity)
      }, 0)
    },
    disadvantagesCost() {
      if (!this.character.disadvantages) return 0
      return this.character.disadvantages.reduce((sum, dis) => sum + dis.cost, 0)
    },
    uniqueAdvantageCost() {
      if (!this.character.uniqueAdvantage) return 0
      return this.character.uniqueAdvantage.cost || 0
    },
    skillsCost() {
      if (!this.character.skills) return 0
      return this.character.skills.reduce((sum, skill) => {
        if (skill.type === 'full') {
          return sum + 2
        } else if (skill.type === 'specializations') {
          return sum + 1
        }
        // Compatibilidade com dados antigos (perícias sem tipo)
        return sum + 2
      }, 0)
    },
    canAffordSpecializations() {
      return this.remainingPoints >= 1
    },
    filteredAdvantages() {
      if (!this.advantageSearch) return advantages
      const search = this.advantageSearch.toLowerCase()
      return advantages.filter(adv => 
        adv.name.toLowerCase().includes(search)
      )
    },
    filteredDisadvantages() {
      if (!this.disadvantageSearch) return disadvantages
      const search = this.disadvantageSearch.toLowerCase()
      return disadvantages.filter(dis => 
        dis.name.toLowerCase().includes(search)
      )
    },
    filteredSkills() {
      if (!this.skillSearch) return skills
      const search = this.skillSearch.toLowerCase()
      return skills.filter(skill => 
        skill.name.toLowerCase().includes(search)
      )
    },
    filteredUniqueAdvantages() {
      if (!this.uniqueAdvantageSearch) return uniqueAdvantages
      const search = this.uniqueAdvantageSearch.toLowerCase()
      return uniqueAdvantages.filter(ua => 
        ua.name.toLowerCase().includes(search) ||
        ua.group.toLowerCase().includes(search)
      )
    },
    allSkills() {
      return skills.filter(skill => skill.specializations && skill.specializations.length > 0)
    }
  },
  mounted() {
    this.loadFromCookie()
  },
  methods: {
    formatAttributeName(attr) {
      const names = {
        forca: 'Força (F)',
        habilidade: 'Habilidade (H)',
        resistencia: 'Resistência (R)',
        armadura: 'Armadura (A)',
        poderDeFogo: 'Poder de Fogo (PdF)'
      }
      return names[attr] || attr
    },
    canAffordAdvantage(advantage) {
      return this.remainingPoints >= advantage.cost
    },
    isAdvantageSelected(advantageName) {
      if (!this.character.advantages) return false
      // Para vantagens que podem ser compradas múltiplas vezes, sempre mostra como disponível
      const advantage = advantages.find(a => a.name === advantageName)
      if (advantage && advantage.purchasableMultiple) {
        return false // Sempre disponível para adicionar mais
      }
      return this.character.advantages.some(adv => adv.name === advantageName)
    },
    toggleAdvantage(advantage) {
      if (!this.character.advantages) {
        this.character.advantages = []
      }
      
      // Para vantagens que podem ser compradas múltiplas vezes, sempre adiciona (não remove)
      if (advantage.purchasableMultiple) {
        // Verificar se a vantagem tem modificadores
        if (advantage.modifiers && advantage.modifiers.length > 0) {
          // Abrir modal de modificadores (com quantidade se aplicável)
          this.advantageForModifiers = advantage
          this.selectedModifiers = []
          this.advantageQuantity = 1
          this.showModifiersModal = true
        } else {
          // Abrir modal de quantidade
          this.advantageForQuantity = advantage
          this.advantageQuantity = 1
          this.showQuantityModal = true
        }
        return
      }
      
      // Para vantagens normais, verificar se já está selecionada
      const index = this.character.advantages.findIndex(adv => adv.name === advantage.name)
      
      if (index >= 0) {
        // Remover vantagem
        this.character.advantages.splice(index, 1)
        this.saveToCookie()
      } else {
        // Verificar se a vantagem tem modificadores
        if (advantage.modifiers && advantage.modifiers.length > 0) {
          // Abrir modal de modificadores
          this.advantageForModifiers = advantage
          this.selectedModifiers = []
          this.showModifiersModal = true
        } else {
          // Adicionar vantagem diretamente se não tiver modificadores
          if (this.canAffordAdvantage(advantage)) {
            this.character.advantages.push({ ...advantage })
            this.saveToCookie()
          }
        }
      }
    },
    removeAdvantage(index) {
      if (this.character.advantages) {
        this.character.advantages.splice(index, 1)
        this.saveToCookie()
      }
    },
    // Métodos para gerenciar modificadores
    calculateAdvantageCostWithModifiers(advantage, selectedModifierIds = []) {
      if (!advantage) return 0
      
      // Se houver modificadores selecionados, usa apenas a soma dos modificadores
      if (advantage.modifiers && selectedModifierIds.length > 0) {
        const modifierCost = selectedModifierIds.reduce((sum, modId) => {
          const modifier = advantage.modifiers.find(m => m.id === modId)
          return sum + (modifier ? modifier.costModifier : 0)
        }, 0)
        return Math.max(1, modifierCost) // Mínimo de 1 ponto
      }
      
      // Se não houver modificadores, usa o custo base
      const baseCost = advantage.cost || 0
      return Math.max(1, baseCost) // Mínimo de 1 ponto
    },
    toggleModifier(modifierId) {
      const index = this.selectedModifiers.indexOf(modifierId)
      if (index >= 0) {
        this.selectedModifiers.splice(index, 1)
      } else {
        this.selectedModifiers.push(modifierId)
      }
    },
    isModifierSelected(modifierId) {
      return this.selectedModifiers.includes(modifierId)
    },
    canAffordAdvantageWithModifiers() {
      if (!this.advantageForModifiers) return false
      const singleCost = this.calculateAdvantageCostWithModifiers(
        this.advantageForModifiers,
        this.selectedModifiers
      )
      const quantity = this.advantageForModifiers.purchasableMultiple ? this.advantageQuantity : 1
      const totalCost = singleCost * quantity
      return this.remainingPoints >= totalCost
    },
    confirmAdvantageWithModifiers() {
      if (!this.advantageForModifiers) return
      
      const advantageToAdd = {
        ...this.advantageForModifiers,
        selectedModifiers: [...this.selectedModifiers]
      }
      
      // Se a vantagem pode ser comprada múltiplas vezes, adicionar quantidade
      if (this.advantageForModifiers.purchasableMultiple) {
        advantageToAdd.quantity = this.advantageQuantity
      }
      
      // Remover propriedades que não precisam ser salvas
      delete advantageToAdd.modifiers
      delete advantageToAdd.purchasableMultiple
      
      if (this.canAffordAdvantageWithModifiers()) {
        this.character.advantages.push(advantageToAdd)
        this.saveToCookie()
        this.closeModifiersModal()
      }
    },
    closeModifiersModal() {
      this.showModifiersModal = false
      this.advantageForModifiers = null
      this.selectedModifiers = []
    },
    // Métodos para gerenciar quantidade
    canAffordAdvantageWithQuantity() {
      if (!this.advantageForQuantity) return false
      const singleCost = this.advantageForQuantity.cost || 0
      const totalCost = singleCost * this.advantageQuantity
      return this.remainingPoints >= totalCost
    },
    confirmAdvantageWithQuantity() {
      if (!this.advantageForQuantity) return
      
      const advantageToAdd = {
        ...this.advantageForQuantity,
        quantity: this.advantageQuantity
      }
      
      // Remover a propriedade purchasableMultiple do objeto salvo
      delete advantageToAdd.purchasableMultiple
      
      if (this.canAffordAdvantageWithQuantity()) {
        this.character.advantages.push(advantageToAdd)
        this.saveToCookie()
        this.closeQuantityModal()
      }
    },
    closeQuantityModal() {
      this.showQuantityModal = false
      this.advantageForQuantity = null
      this.advantageQuantity = 1
    },
    increaseQuantity() {
      if (this.advantageForQuantity) {
        this.advantageQuantity++
      }
    },
    decreaseQuantity() {
      if (this.advantageQuantity > 1) {
        this.advantageQuantity--
      }
    },
    getAdvantageTotalCost(advantage) {
      let singleCost = 0
      
      // Se houver modificadores selecionados, usa apenas a soma dos modificadores
      if (advantage.selectedModifiers && advantage.selectedModifiers.length > 0) {
        const originalAdvantage = advantages.find(a => a.name === advantage.name)
        if (originalAdvantage && originalAdvantage.modifiers) {
          const modifierCost = advantage.selectedModifiers.reduce((sum, modId) => {
            const modifier = originalAdvantage.modifiers.find(m => m.id === modId)
            return sum + (modifier ? modifier.costModifier : 0)
          }, 0)
          singleCost = Math.max(1, modifierCost) // Mínimo de 1 ponto
        }
      } else {
        // Se não houver modificadores, usa o custo base
        const baseCost = advantage.cost || 0
        singleCost = Math.max(1, baseCost) // Mínimo de 1 ponto
      }
      
      // Multiplicar pela quantidade se houver
      const quantity = advantage.quantity || 1
      return singleCost * quantity
    },
    getModifierName(advantageName, modifierId) {
      const originalAdvantage = advantages.find(a => a.name === advantageName)
      if (originalAdvantage && originalAdvantage.modifiers) {
        const modifier = originalAdvantage.modifiers.find(m => m.id === modifierId)
        return modifier ? modifier.name : modifierId
      }
      return modifierId
    },
    increaseAttribute(attr) {
      if (this.remainingPoints > 0 && this.character.attributes[attr] < 5) {
        this.character.attributes[attr]++
        this.saveToCookie()
      }
    },
    decreaseAttribute(attr) {
      if (this.character.attributes[attr] > 0) {
        this.character.attributes[attr]--
        this.saveToCookie()
      }
    },
    updateAttribute(attr) {
      if (this.character.attributes[attr] < 0) {
        this.character.attributes[attr] = 0
      }
      if (this.character.attributes[attr] > 5) {
        this.character.attributes[attr] = 5
      }
      this.saveToCookie()
    },
    updateTotalPoints() {
      if (this.totalPoints < 0) {
        this.totalPoints = 0
      }
      this.saveToCookie()
    },
    saveToCookie() {
      const dataToSave = {
        totalPoints: this.totalPoints,
        character: this.character
      }
      setCookieObject(COOKIE_NAME, dataToSave)
    },
    loadFromCookie() {
      const savedData = getCookieObject(COOKIE_NAME)
      if (savedData) {
        if (savedData.totalPoints !== undefined) {
          this.totalPoints = savedData.totalPoints
        }
        if (savedData.character) {
          this.character = { ...this.character, ...savedData.character }
          // Remover level se existir (campo removido do sistema)
          if (this.character.level !== undefined) {
            delete this.character.level
          }
          // Garantir que todos os atributos existam
          if (!this.character.attributes) {
            this.character.attributes = {
              forca: 0,
              habilidade: 0,
              resistencia: 0,
              armadura: 0,
              poderDeFogo: 0
            }
          }
          // Garantir que advantages exista
          if (!this.character.advantages) {
            this.character.advantages = []
          }
          // Garantir que disadvantages exista
          if (!this.character.disadvantages) {
            this.character.disadvantages = []
          }
          // Garantir que skills exista e migrar dados antigos
          if (!this.character.skills) {
            this.character.skills = []
          } else {
            // Migrar perícias antigas (sem type) para perícias completas
            this.character.skills = this.character.skills.map(skill => {
              if (!skill.type) {
                return {
                  type: 'full',
                  name: skill.name,
                  cost: 2
                }
              }
              return skill
            })
          }
          // Garantir que experiencePoints exista
          if (this.character.experiencePoints === undefined) {
            this.character.experiencePoints = 0
          }
        }
      }
    },
    resetSheet() {
      if (confirm('Tem certeza que deseja resetar a ficha? Todos os dados serão perdidos.')) {
        this.totalPoints = 0
        this.character = {
          name: '',
          attributes: {
            forca: 0,
            habilidade: 0,
            resistencia: 0,
            armadura: 0,
            poderDeFogo: 0
          },
          advantages: [],
          disadvantages: [],
          uniqueAdvantage: null,
          skills: [],
          experiencePoints: 0,
          background: '',
          notes: ''
        }
        this.saveToCookie()
      }
    },
    // Desvantagens
    isDisadvantageSelected(disadvantageName) {
      if (!this.character.disadvantages) return false
      return this.character.disadvantages.some(dis => dis.name === disadvantageName)
    },
    toggleDisadvantage(disadvantage) {
      if (!this.character.disadvantages) {
        this.character.disadvantages = []
      }
      
      const index = this.character.disadvantages.findIndex(dis => dis.name === disadvantage.name)
      
      if (index >= 0) {
        this.character.disadvantages.splice(index, 1)
      } else {
        this.character.disadvantages.push({ ...disadvantage })
      }
      
      this.saveToCookie()
    },
    removeDisadvantage(index) {
      if (this.character.disadvantages) {
        this.character.disadvantages.splice(index, 1)
        this.saveToCookie()
      }
    },
    // Vantagens Únicas
    canAffordUniqueAdvantage(uniqueAdv) {
      return this.remainingPoints >= uniqueAdv.cost
    },
    selectUniqueAdvantage(uniqueAdv) {
      if (this.canAffordUniqueAdvantage(uniqueAdv)) {
        this.character.uniqueAdvantage = { ...uniqueAdv }
        this.saveToCookie()
      }
    },
    removeUniqueAdvantage() {
      this.character.uniqueAdvantage = null
      this.saveToCookie()
    },
    // Perícias
    isFullSkillSelected(skillName) {
      if (!this.character.skills) return false
      return this.character.skills.some(skill => 
        skill.type === 'full' && skill.name === skillName
      )
    },
    canAffordSkill(skill, type) {
      if (type === 'full') {
        return this.remainingPoints >= 2
      }
      return true
    },
    toggleFullSkill(skill) {
      if (!this.character.skills) {
        this.character.skills = []
      }
      
      const index = this.character.skills.findIndex(s => 
        s.type === 'full' && s.name === skill.name
      )
      
      if (index >= 0) {
        // Remover perícia completa
        this.character.skills.splice(index, 1)
      } else {
        // Adicionar perícia completa se tiver pontos suficientes
        if (this.canAffordSkill(skill, 'full')) {
          this.character.skills.push({
            type: 'full',
            name: skill.name,
            cost: 2
          })
        }
      }
      
      this.saveToCookie()
    },
    // Especializações
    getFilteredSpecializations(skill) {
      if (!this.specializationSearch) return skill.specializations || []
      const search = this.specializationSearch.toLowerCase()
      return (skill.specializations || []).filter(spec =>
        spec.toLowerCase().includes(search) ||
        skill.name.toLowerCase().includes(search)
      )
    },
    isSpecializationSelected(specName) {
      // Verifica se está selecionada temporariamente
      return this.selectedSpecializations.some(s => s.name === specName)
    },
    isSpecializationAlreadyAcquired(specName) {
      // Verifica se a especialização já foi adquirida (está salva no character.skills)
      if (!this.character.skills) return false
      return this.character.skills.some(skill => {
        if (skill.type === 'specializations' && skill.specializations) {
          return skill.specializations.includes(specName)
        }
        return false
      })
    },
    canSelectSpecialization(specName) {
      // Não pode selecionar se já foi adquirida
      if (this.isSpecializationAlreadyAcquired(specName)) return false
      // Pode selecionar se já está selecionada temporariamente (para desmarcar)
      if (this.isSpecializationSelected(specName)) return true
      // Pode selecionar se tem menos de 3 selecionadas
      return this.selectedSpecializations.length < 3
    },
    toggleSpecialization(specName, skillName) {
      const index = this.selectedSpecializations.findIndex(s => s.name === specName)
      
      if (index >= 0) {
        // Remover especialização
        this.selectedSpecializations.splice(index, 1)
      } else {
        // Adicionar especialização se tiver menos de 3
        if (this.selectedSpecializations.length < 3) {
          this.selectedSpecializations.push({
            name: specName,
            skill: skillName
          })
        }
      }
    },
    confirmSpecializations() {
      if (this.selectedSpecializations.length === 3 && this.canAffordSpecializations) {
        if (!this.character.skills) {
          this.character.skills = []
        }
        
        this.character.skills.push({
          type: 'specializations',
          specializations: this.selectedSpecializations.map(s => s.name),
          cost: 1
        })
        
        this.selectedSpecializations = []
        this.saveToCookie()
      }
    },
    clearSpecializations() {
      this.selectedSpecializations = []
    },
    closeSkillsModal() {
      this.showSkillsModal = false
      this.skillsMode = 'full'
      this.selectedSpecializations = []
      this.skillSearch = ''
      this.specializationSearch = ''
    },
    removeSkill(index) {
      if (this.character.skills) {
        this.character.skills.splice(index, 1)
        this.saveToCookie()
      }
    },
    // Popover de descrição de vantagem
    showAdvantageDescription(advantage) {
      this.selectedAdvantageForDescription = advantage
    },
    closeAdvantageDescription() {
      this.selectedAdvantageForDescription = null
    },
    // Popover de descrição de desvantagem
    showDisadvantageDescription(disadvantage) {
      this.selectedDisadvantageForDescription = disadvantage
    },
    closeDisadvantageDescription() {
      this.selectedDisadvantageForDescription = null
    },
    // Popover de descrição de vantagem única (raça)
    showUniqueAdvantageDescription(uniqueAdv) {
      this.selectedUniqueAdvantageForDescription = uniqueAdv
    },
    closeUniqueAdvantageDescription() {
      this.selectedUniqueAdvantageForDescription = null
    },
    formatDescription(description) {
      if (!description) return []
      // Divide por pontos finais seguidos de espaço ou quebra de linha
      // Mantém parágrafos separados
      return description
        .split(/(?<=[.!?])\s+(?=[A-Z])|(?<=\n\n)/)
        .filter(p => p.trim().length > 0)
        .map(p => p.trim())
    }
  }
}
</script>

<style scoped>
.character-sheet {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.sheet-header {
  border-bottom: 3px solid #4a5568;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.sheet-header h1 {
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 20px;
}

.points-control {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.points-control label {
  font-weight: 600;
  color: #4a5568;
}

.points-input {
  width: 120px;
  padding: 8px 12px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
}

.points-input:focus {
  outline: none;
  border-color: #4299e1;
}

.points-remaining {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
}

.points-remaining span {
  color: #38a169;
  font-size: 1.2rem;
}

.points-remaining span.negative {
  color: #e53e3e;
}

.sheet-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sheet-section {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  background: #f7fafc;
  display: block;
}

.sheet-section h2 {
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #cbd5e0;
}

/* Grid de seções lado a lado */
.sections-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.sections-grid .sheet-section {
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.sections-grid .sheet-section h2 {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.sections-grid .advantages-list-main {
  grid-template-columns: 1fr;
  gap: 8px;
}

.sections-grid .section-header-with-button {
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.sections-grid .section-header-with-button h2 {
  width: 100%;
}

.sections-grid .btn-add-advantage {
  width: 100%;
  font-size: 0.85rem;
  padding: 6px 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4299e1;
}

.form-group textarea {
  resize: vertical;
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.attribute-item {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  padding: 15px;
  transition: box-shadow 0.2s;
}

.attribute-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.attribute-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.attribute-header label {
  font-weight: 600;
  color: #4a5568;
  font-size: 1.1rem;
}

.attribute-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  background: #edf2f7;
  padding: 4px 12px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
}

.attribute-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-control {
  width: 40px;
  height: 40px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  background: white;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-control:hover:not(:disabled) {
  background: #edf2f7;
  border-color: #4299e1;
  transform: scale(1.05);
}

.btn-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-decrease {
  color: #e53e3e;
}

.btn-increase {
  color: #38a169;
}

.attribute-input {
  flex: 1;
  padding: 8px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}

.attribute-input:focus {
  outline: none;
  border-color: #4299e1;
}

.sheet-actions {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.btn-reset {
  padding: 12px 24px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-reset:hover {
  background: #c53030;
}

.section-header-with-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #cbd5e0;
}

.section-header-with-button h2 {
  margin: 0;
  padding: 0;
  border: none;
}

.btn-add-advantage {
  padding: 8px 16px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-add-advantage:hover {
  background: #3182ce;
}

/* Lista de vantagens/desvantagens/perícias na página principal - GRID DE 2 COLUNAS */
.advantages-list-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}

.advantages-list-main .advantage-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  transition: box-shadow 0.2s;
  min-width: 0;
  box-sizing: border-box;
}

.advantages-list-main .advantage-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.advantage-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.advantage-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.advantage-cost {
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 4px;
}

.advantage-modifiers {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
  align-items: center;
}

.modifiers-label {
  font-size: 0.85em;
  color: #718096;
  font-weight: 500;
}

.modifier-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #e2e8f0;
  border-radius: 12px;
  font-size: 0.8em;
  color: #4a5568;
  font-weight: 500;
}

.btn-remove-advantage {
  width: 28px;
  height: 28px;
  border: none;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-remove-advantage:hover {
  background: #c53030;
}

.no-advantages {
  padding: 20px;
  text-align: center;
  color: #718096;
  font-style: italic;
}

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
  max-width: 800px;
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

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #4299e1;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.advantage-option {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.advantage-option:hover:not(.disabled) {
  border-color: #4299e1;
  box-shadow: 0 2px 8px rgba(66, 153, 225, 0.2);
}

.advantage-option.selected {
  background: #bee3f8;
  border-color: #4299e1;
}

.advantage-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f7fafc;
}

.advantage-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.advantage-option-name-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: visible;
}

.advantage-option-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.advantage-option-cost {
  color: #4a5568;
  font-weight: 600;
  font-size: 0.85rem;
}

.advantage-option-group {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 4px;
}

.advantage-option-description {
  font-size: 0.8rem;
  color: #4a5568;
  margin-top: 6px;
  font-style: italic;
}

.advantage-option {
  position: relative;
}

.advantage-info-btn {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border: none;
  background: rgba(66, 153, 225, 0.1);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, opacity 0.2s, background 0.2s;
  padding: 0;
  flex-shrink: 0;
  opacity: 0.8;
  line-height: 1;
  z-index: 10;
}

.advantage-info-btn:hover {
  transform: scale(1.2);
  opacity: 1;
}

.advantage-option-summary {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 6px;
  line-height: 1.4;
  font-style: italic;
}

/* Popover Styles */
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

.pv-pm-display {
  display: flex;
  gap: 30px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.pv-pm-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.pv-pm-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  background: #edf2f7;
  padding: 4px 12px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
}

.unique-advantage-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.unique-advantage-display .advantage-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  transition: box-shadow 0.2s;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
}

.advantage-description {
  padding: 10px;
  background: #f7fafc;
  border-left: 3px solid #4299e1;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #4a5568;
  margin-top: 10px;
}

.form-group small {
  display: block;
  margin-top: 4px;
  font-size: 0.85rem;
  color: #718096;
}

.form-group small.pe-conversion {
  color: #38a169;
  font-weight: 600;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 2px solid #e2e8f0;
}

.modal-points-info {
  color: #4a5568;
  font-weight: 600;
}

.modal-points-info strong {
  color: #2d3748;
  font-size: 1.1rem;
}

/* Modifiers Modal Styles */
.modifiers-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
}

.modifiers-info p {
  margin: 8px 0;
  color: #4a5568;
}

.modifiers-info .error-message {
  color: #c53030;
  font-weight: 600;
  margin-top: 10px;
}

.modifiers-list {
  margin-top: 20px;
}

.modifiers-list h3 {
  margin-bottom: 15px;
  color: #2d3748;
  font-size: 1.1rem;
}

.modifier-option {
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.modifier-option:hover {
  border-color: #4299e1;
  box-shadow: 0 2px 4px rgba(66, 153, 225, 0.1);
}

.modifier-option.selected {
  border-color: #4299e1;
  background: #ebf8ff;
}

.modifier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.modifier-name-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modifier-name-wrapper input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.modifier-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
}

.modifier-cost {
  display: flex;
  gap: 8px;
  align-items: center;
}

.cost-modifier {
  padding: 4px 10px;
  background: #4299e1;
  color: white;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.pm-modifier {
  padding: 4px 10px;
  background: #805ad5;
  color: white;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.modifier-description {
  color: #4a5568;
  font-size: 0.9em;
  line-height: 1.5;
  margin-top: 8px;
}

.modifier-restriction {
  margin-top: 8px;
  padding: 6px 10px;
  background: #fff5cd;
  border-left: 3px solid #f6ad55;
  border-radius: 4px;
  font-size: 0.85em;
  color: #744210;
}

.btn-cancel {
  padding: 10px 20px;
  background: #cbd5e0;
  color: #2d3748;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #a0aec0;
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
  background: #cbd5e0;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Quantity Modal Styles */
.quantity-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
}

.quantity-info p {
  margin: 8px 0;
  color: #4a5568;
}

.quantity-selector {
  margin-top: 20px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2d3748;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-quantity {
  width: 40px;
  height: 40px;
  border: 2px solid #cbd5e0;
  background: white;
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-quantity:hover:not(:disabled) {
  background: #4299e1;
  border-color: #4299e1;
  color: white;
}

.btn-quantity:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 80px;
  height: 40px;
  text-align: center;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
}

.quantity-input:focus {
  outline: none;
  border-color: #4299e1;
}

.quantity-badge {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  background: #4299e1;
  color: white;
  border-radius: 12px;
  font-size: 0.75em;
  font-weight: 600;
}

.quantity-selector-inline {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
}

.quantity-selector-inline label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2d3748;
}

.btn-close {
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

.btn-close:hover {
  background: #3182ce;
}

/* Estilos para Modal de Perícias */
.skills-mode-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.mode-button {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-button:hover {
  border-color: #4299e1;
  background: #edf2f7;
}

.mode-button.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.skills-full-mode,
.skills-specializations-mode {
  margin-top: 20px;
}

.specializations-counter {
  padding: 10px;
  background: #edf2f7;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}

.specializations-counter strong {
  color: #2d3748;
  font-size: 1.1rem;
}

.specializations-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.skill-group {
  margin-bottom: 25px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.skill-group-title {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #cbd5e0;
}

.specializations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.specialization-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.specialization-item:hover:not(.disabled) {
  border-color: #4299e1;
  background: #edf2f7;
}

.specialization-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.specialization-item.already-acquired {
  background: #fed7d7;
  border-color: #fc8181;
}

.specialization-item.already-acquired .specialization-name {
  color: #742a2a;
}

.already-acquired-badge {
  font-size: 0.75rem;
  color: #c53030;
  font-weight: 600;
  margin-left: 5px;
}

.specialization-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.specialization-item.disabled input[type="checkbox"] {
  cursor: not-allowed;
}

.specialization-name {
  flex: 1;
  font-size: 0.9rem;
  color: #2d3748;
}

.specializations-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.btn-confirm-specializations {
  flex: 1;
  padding: 12px 20px;
  background: #38a169;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-confirm-specializations:hover:not(:disabled) {
  background: #2f855a;
}

.btn-confirm-specializations:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear-specializations {
  padding: 12px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-clear-specializations:hover {
  background: #c53030;
}

/* Responsividade */
@media (max-width: 1024px) {
  .sections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .character-sheet {
    padding: 20px;
  }

  .sheet-header h1 {
    font-size: 1.5rem;
  }

  .points-control {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .attributes-grid {
    grid-template-columns: 1fr;
  }

  .sections-grid {
    grid-template-columns: 1fr;
  }

  .section-header-with-button {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .advantages-grid {
    grid-template-columns: 1fr;
  }

  .advantages-list-main {
    grid-template-columns: 1fr;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-footer {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
}
</style>

