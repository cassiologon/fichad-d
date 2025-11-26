<template>
  <div class="character-sheet">
    <!-- Sistema de Tabs -->
    <div class="tabs-container">
      <div class="tabs-list">
        <div
          v-for="(char, index) in characters"
          :key="index"
          :class="['tab-item', { active: activeTabIndex === index }]"
          @click="switchTab(index)"
        >
          <span class="tab-name">{{ getTabName(char) }}</span>
          <button
            v-if="characters.length > 1"
            type="button"
            class="tab-close"
            @click.stop="closeTab(index)"
            title="Fechar aba"
          >
            ×
          </button>
        </div>
        <button
          type="button"
          class="tab-add"
          @click="addNewTab"
          title="Nova ficha"
        >
          +
        </button>
      </div>
    </div>

    <div class="sheet-header">
      <h1>Ficha de Personagem</h1>
      <div class="points-control">
        <label for="total-points">Pontos Disponíveis:</label>
        <input
          id="total-points"
          type="number"
          v-model.number="currentCharacterData.totalPoints"
          @input="updateTotalPoints"
          class="points-input"
        />
        <div class="points-remaining">
          Pontos Restantes: <span :class="{ 'negative': remainingPoints < 0 }">{{ remainingPoints }}</span>
        </div>
      </div>
    </div>

    <div class="sheet-content">
      <!-- Grid: Informações Básicas e Atributos lado a lado -->
      <div class="basic-info-attributes-grid">
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
              <div class="attribute-label">{{ formatAttributeName(attr) }}</div>
              <div class="attribute-main-value">{{ value }}</div>
              <span v-if="getAttributeBonusLabel(attr)" class="attribute-bonus-badge">
                {{ getAttributeBonusLabel(attr) }}
              </span>
              <div class="attribute-controls">
                <button
                  type="button"
                  @click="decreaseAttribute(attr)"
                  class="btn-control btn-decrease"
                  title="Diminuir"
                >
                  -
                </button>
                <button
                  type="button"
                  @click="increaseAttribute(attr)"
                  :disabled="value >= 5"
                  class="btn-control btn-increase"
                  title="Aumentar"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <!-- PVs e PMs -->
          <div class="pv-pm-display">
            <div class="pv-pm-item">
              <span class="pv-pm-label">PVs:</span>
              <span class="pv-pm-value">{{ calculatedPVs }}</span>
            </div>
            <div class="pv-pm-item">
              <span class="pv-pm-label">PMs:</span>
              <span class="pv-pm-value">{{ calculatedPMs }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Grid de Seções: Raça, Vantagens, Desvantagens e Perícias -->
      <div class="sections-grid">
        <!-- Vantagem Única (Raça) -->
        <section class="sheet-section">
          <div class="section-header-with-button">
            <h2>Raça</h2>
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
                <span class="advantage-cost">
                  <span v-if="advantage.freeFromRace" class="free-badge">
                    <span class="free-label">Grátis</span>
                    <span class="free-source">({{ advantage.freeFromRace }})</span>
                  </span>
                  <span v-else-if="advantage.alienBonus" class="alien-bonus-cost">
                    <span v-if="advantage.cost === 0" class="free-badge">
                      <span class="free-label">Grátis</span>
                      <span class="free-source">(Alien)</span>
                    </span>
                    <span v-else class="discounted-cost">
                      <span class="original-cost">{{ advantage.originalCost || 2 }} pts</span>
                      <span class="current-cost">{{ advantage.cost }} pt{{ advantage.cost > 1 ? 's' : '' }}</span>
                      <span class="discount-badge">Desconto</span>
                    </span>
                  </span>
                  <span v-else-if="advantage.discountedFromRace" class="discounted-cost">
                    <span class="current-cost">{{ getAdvantageTotalCost(advantage) }} pts</span>
                    <span class="discount-badge">Desconto {{ advantage.discountedFromRace }}</span>
                  </span>
                  <span v-else>{{ getAdvantageTotalCost(advantage) }} pts</span>
                </span>
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
        </section>
      </div>

      <!-- Magias -->
      <section class="sheet-section">
        <div class="section-header-with-button">
          <h2>Magias</h2>
          <button type="button" @click="showSpellsModal = true" class="btn-add-advantage">
            + Adicionar Magia
          </button>
        </div>
        <div v-if="character.spells && character.spells.length > 0" class="advantages-list-main">
          <div
            v-for="(spell, index) in character.spells"
            :key="index"
            class="advantage-item"
          >
            <div class="advantage-info">
              <span class="advantage-name">{{ spell.name }}</span>
              <span class="advantage-cost">{{ spell.cost }}</span>
              <span class="advantage-group">{{ spell.school }}</span>
            </div>
            <button
              type="button"
              @click="removeSpell(index)"
              class="btn-remove-advantage"
              title="Remover magia"
            >
              ×
            </button>
          </div>
        </div>
      </section>

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

      <!-- Botões de Ação -->
      <div class="sheet-actions">
        <button type="button" @click="exportCharacterSheet" class="btn-export">
          Salvar Ficha
        </button>
        <button type="button" @click="triggerImport" class="btn-import">
          Importar Ficha
        </button>
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          @change="importCharacterSheet"
          style="display: none"
        />
        <button type="button" @click="resetSheet" class="btn-reset">
          Resetar Ficha
        </button>
      </div>
    </div>

    <!-- Modal de Vantagens -->
    <AdvantagesModal
      :show="showAdvantagesModal"
      :character="character"
      :advantages-cost="advantagesCost"
      :remaining-points="remainingPoints"
      :get-advantage-cost-with-race-discount="getAdvantageCostWithRaceDiscount"
      :is-advantage-selected="isAdvantageSelected"
      @close="showAdvantagesModal = false"
      @toggle-advantage="toggleAdvantage"
      @show-description="showAdvantageDescription"
    />

    <!-- Modal de Desvantagens -->
    <DisadvantagesModal
      :show="showDisadvantagesModal"
      :disadvantages-cost="disadvantagesCost"
      :is-disadvantage-selected="isDisadvantageSelected"
      @close="showDisadvantagesModal = false"
      @toggle-disadvantage="toggleDisadvantage"
      @show-description="showDisadvantageDescription"
    />

    <!-- Popover de Descrição de Desvantagem -->
    <DisadvantageDescriptionPopover
      :item="selectedDisadvantageForDescription"
      :format-description="formatDescription"
      @close="closeDisadvantageDescription"
    />

    <!-- Modal de Vantagens Únicas -->
    <UniqueAdvantageModal
      :show="showUniqueAdvantageModal"
      :character="character"
      :remaining-points="remainingPoints"
      :can-afford-unique-advantage="canAffordUniqueAdvantage"
      @close="showUniqueAdvantageModal = false"
      @select-unique-advantage="selectUniqueAdvantage"
      @show-description="showUniqueAdvantageDescription"
    />

    <!-- Modal de Perícias -->
    <SkillsModal
      :show="showSkillsModal"
      :character="character"
      :skills-cost="skillsCost"
      :remaining-points="remainingPoints"
      :is-full-skill-selected="isFullSkillSelected"
      :can-afford-skill="canAffordSkill"
      :is-specialization-already-acquired="isSpecializationAlreadyAcquired"
      @close="closeSkillsModal"
      @toggle-full-skill="toggleFullSkill"
      @confirm-specializations="handleConfirmSpecializations"
    />

    <!-- Popover de Descrição de Vantagem -->
    <AdvantageDescriptionPopover
      :item="selectedAdvantageForDescription"
      :format-description="formatDescription"
      @close="closeAdvantageDescription"
    />

    <!-- Modal de Quantidade de Vantagem -->
    <QuantityModal
      :show="showQuantityModal"
      :advantage="advantageForQuantity"
      :character="character"
      :remaining-points="remainingPoints"
      :get-advantage-cost-with-race-discount="getAdvantageCostWithRaceDiscount"
      @close="closeQuantityModal"
      @confirm="handleConfirmAdvantageWithQuantity"
    />

    <!-- Modal de Modificadores de Vantagem -->
    <ModifiersModal
      :show="showModifiersModal"
      :advantage="advantageForModifiers"
      :character="character"
      :remaining-points="remainingPoints"
      :get-advantage-cost-with-race-discount="getAdvantageCostWithRaceDiscount"
      :calculate-advantage-cost-with-modifiers="calculateAdvantageCostWithModifiers"
      @close="closeModifiersModal"
      @confirm="handleConfirmAdvantageWithModifiers"
    />

    <!-- Modal de Magias -->
    <SpellsModal
      :show="showSpellsModal"
      :is-spell-selected="isSpellSelected"
      @close="showSpellsModal = false"
      @toggle-spell="toggleSpell"
      @show-description="showSpellDescription"
    />

    <!-- Popover de Descrição de Vantagem Única (Raça) -->
    <UniqueAdvantageDescriptionPopover
      :item="selectedUniqueAdvantageForDescription"
      :format-description="formatDescription"
      @close="closeUniqueAdvantageDescription"
    />

    <!-- Popover de Descrição de Magia -->
    <SpellDescriptionPopover
      :item="selectedSpellForDescription"
      :format-description="formatDescription"
      @close="closeSpellDescription"
    />

    <!-- Modal de Vantagens Gratuitas por Raça -->
    <FreeAdvantagesModal
      :show="showFreeAdvantagesModal"
      :race="raceForFreeAdvantages"
      @close="closeFreeAdvantagesModal"
      @confirm="handleConfirmFreeAdvantages"
    />
  </div>
  
  <!-- Modal de Vantagem Bônus do Alien -->
  <AlienBonusModal
    :show="showAlienBonusModal"
    :character="character"
    :advantages1-point="advantages1Point"
    :advantages2-points="advantages2Points"
    @close="closeAlienBonusModal"
    @confirm="handleConfirmAlienBonus"
    @show-description="showAdvantageDescription"
  />
  
  <!-- Modal de Escolha de Atributo (Característica +1) -->
  <AttributeChoiceModal
    :show="showAttributeChoiceModal"
    :race="raceForAttributeChoice"
    :character="character"
    :format-attribute-name="formatAttributeName"
    @close="closeAttributeChoiceModal"
    @confirm="handleConfirmAttributeChoice"
  />

  <!-- Modal de Confirmação -->
  <ConfirmModal
    :show="showConfirmModal"
    :title="confirmModalTitle"
    :message="confirmModalMessage"
    :confirm-text="confirmModalConfirmText"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />

  <!-- Botão Flutuante de Pontos -->
  <div class="points-floating">
    <div class="points-floating-content">
      <span class="points-floating-label">Pontos Restantes:</span>
      <span class="points-floating-value" :class="{ 'negative': remainingPoints < 0 }">
        {{ remainingPoints }}
      </span>
    </div>
  </div>
</template>

<script>
import { getCookieObject, setCookieObject } from '../utils/cookieUtils'
import { advantages } from '../data/advantages'
import { disadvantages } from '../data/disadvantages'
import { skills } from '../data/skills'
import { uniqueAdvantages } from '../data/uniqueAdvantages'
import { spells } from '../data/spells'
import AdvantagesModal from './modals/AdvantagesModal.vue'
import DisadvantagesModal from './modals/DisadvantagesModal.vue'
import UniqueAdvantageModal from './modals/UniqueAdvantageModal.vue'
import SkillsModal from './modals/SkillsModal.vue'
import QuantityModal from './modals/QuantityModal.vue'
import ModifiersModal from './modals/ModifiersModal.vue'
import SpellsModal from './modals/SpellsModal.vue'
import FreeAdvantagesModal from './modals/FreeAdvantagesModal.vue'
import AlienBonusModal from './modals/AlienBonusModal.vue'
import AttributeChoiceModal from './modals/AttributeChoiceModal.vue'
import AdvantageDescriptionPopover from './modals/AdvantageDescriptionPopover.vue'
import DisadvantageDescriptionPopover from './modals/DisadvantageDescriptionPopover.vue'
import UniqueAdvantageDescriptionPopover from './modals/UniqueAdvantageDescriptionPopover.vue'
import SpellDescriptionPopover from './modals/SpellDescriptionPopover.vue'
import ConfirmModal from './modals/ConfirmModal.vue'

const COOKIE_NAME = 'character_sheet_data'

export default {
  name: 'CharacterSheet',
  components: {
    AdvantagesModal,
    DisadvantagesModal,
    UniqueAdvantageModal,
    SkillsModal,
    QuantityModal,
    ModifiersModal,
    SpellsModal,
    FreeAdvantagesModal,
    AlienBonusModal,
    AttributeChoiceModal,
    AdvantageDescriptionPopover,
    DisadvantageDescriptionPopover,
    UniqueAdvantageDescriptionPopover,
    SpellDescriptionPopover,
    ConfirmModal
  },
  data() {
    const defaultCharacter = {
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
      spells: [],
      experiencePoints: 0,
      background: '',
      notes: ''
    }

    return {
      characters: [
        {
          totalPoints: 0,
          character: { ...defaultCharacter }
        }
      ],
      activeTabIndex: 0,
      showAdvantagesModal: false,
      showDisadvantagesModal: false,
      showSkillsModal: false,
      showUniqueAdvantageModal: false,
      showSpellsModal: false,
      selectedAdvantageForDescription: null,
      selectedDisadvantageForDescription: null,
      selectedUniqueAdvantageForDescription: null,
      selectedSpellForDescription: null,
      showModifiersModal: false,
      advantageForModifiers: null, // Vantagem que está sendo configurada com modificadores
      showQuantityModal: false,
      advantageForQuantity: null, // Vantagem que está sendo configurada com quantidade
      showFreeAdvantagesModal: false,
      raceForFreeAdvantages: null, // Raça que está concedendo vantagens gratuitas
      showAlienBonusModal: false, // Modal para escolher vantagem bônus do Alien
      showAttributeChoiceModal: false, // Modal para escolher atributo quando raça tem Característica +1
      raceForAttributeChoice: null, // Raça que requer escolha de atributo
      showConfirmModal: false,
      confirmModalTitle: 'Confirmar ação',
      confirmModalMessage: '',
      confirmModalConfirmText: 'Confirmar',
      confirmModalResolve: null // Promise resolver para confirmações assíncronas
    }
  },
  computed: {
    currentCharacterData() {
      return this.characters[this.activeTabIndex] || this.characters[0]
    },
    totalPoints: {
      get() {
        return this.currentCharacterData.totalPoints
      },
      set(value) {
        this.currentCharacterData.totalPoints = value
      }
    },
    character: {
      get() {
        return this.currentCharacterData.character
      },
      set(value) {
        this.currentCharacterData.character = value
      }
    },
    calculatedPVs() {
      const resistenciaBase = this.character.attributes.resistencia || 0
      const resistenciaBonus = this.getAttributeBonus('resistencia') || 0
      const resistenciaTotal = resistenciaBase + resistenciaBonus
      if (resistenciaTotal === 0) return 1
      return resistenciaTotal * 5
    },
    advantages1Point() {
      // Retorna vantagens de 1 ponto que ainda não foram adicionadas
      const addedNames = this.character.advantages ? this.character.advantages.map(a => a.name) : []
      return advantages.filter(adv => adv.cost === 1 && !addedNames.includes(adv.name))
    },
    advantages2Points() {
      // Retorna vantagens de 2 pontos (exceto perícias) que ainda não foram adicionadas
      const addedNames = this.character.advantages ? this.character.advantages.map(a => a.name) : []
      const skillNames = skills.map(s => s.name)
      return advantages.filter(adv => 
        adv.cost === 2 && 
        !addedNames.includes(adv.name) && 
        !skillNames.includes(adv.name)
      )
    },
    calculatedPMs() {
      const resistenciaBase = this.character.attributes.resistencia || 0
      const resistenciaBonus = this.getAttributeBonus('resistencia') || 0
      const resistenciaTotal = resistenciaBase + resistenciaBonus
      if (resistenciaTotal === 0) return 1
      return resistenciaTotal * 5
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
        // Se for vantagem gratuita ou bônus do Alien (já com custo ajustado), usar o custo definido
        if (adv.freeFromRace) {
          return sum
        }
        if (adv.alienBonus) {
          return sum + (adv.cost || 0)
        }
        
        let singleCost = 0
        
        // Se for bônus do Alien, usar o custo já definido
        if (adv.alienBonus) {
          singleCost = adv.cost || 0
        }
        // Se houver modificadores selecionados, usa apenas a soma dos modificadores
        else if (adv.selectedModifiers && adv.selectedModifiers.length > 0) {
          const originalAdvantage = advantages.find(a => a.name === adv.name)
          if (originalAdvantage && originalAdvantage.modifiers) {
            const modifierCost = adv.selectedModifiers.reduce((modSum, modId) => {
              const modifier = originalAdvantage.modifiers.find(m => m.id === modId)
              return modSum + (modifier ? modifier.costModifier : 0)
            }, 0)
            singleCost = Math.max(1, modifierCost) // Mínimo de 1 ponto
          }
        } else {
          // Se não houver modificadores, verificar desconto da raça ou usar custo base
          singleCost = this.getAdvantageCostWithRaceDiscount(adv)
          singleCost = Math.max(1, singleCost) // Mínimo de 1 ponto (exceto se for 0 por ser gratuita)
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
      return true
    },
    allSkills() {
      return skills.filter(skill => skill.specializations && skill.specializations.length > 0)
    },
    raceAttributeBonuses() {
      if (!this.character.uniqueAdvantage || !this.character.uniqueAdvantage.attributeBonuses) {
        return {}
      }
      
      const bonuses = {}
      const raceBonuses = this.character.uniqueAdvantage.attributeBonuses
      
      // Processar bônus normais
      Object.keys(raceBonuses).forEach(attr => {
        const bonus = raceBonuses[attr]
        
        // Se for objeto com condition (bônus condicional)
        if (typeof bonus === 'object' && bonus !== null && bonus.condition) {
          bonuses[attr] = bonus
        }
        // Se for caracteristica (escolha do jogador)
        else if (attr === 'caracteristica') {
          // Verificar se o jogador já escolheu
          if (this.character.raceAttributeChoice) {
            const bonusValue = typeof bonus === 'number' ? bonus : (typeof bonus === 'object' && bonus !== null && typeof bonus.value === 'number' ? bonus.value : null)
            if (bonusValue !== null) {
              bonuses[this.character.raceAttributeChoice] = bonusValue
            }
          }
        }
        // Bônus normal
        else {
          const bonusValue = typeof bonus === 'number' ? bonus : (typeof bonus === 'object' && bonus !== null && typeof bonus.value === 'number' ? bonus.value : null)
          if (bonusValue !== null) {
            bonuses[attr] = bonusValue
          }
        }
      })
      
      return bonuses
    }
  },
  watch: {
    showAdvantagesModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.advantageSearchInput) {
            this.$refs.advantageSearchInput.focus()
          }
        })
      }
    },
    showDisadvantagesModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.disadvantageSearchInput) {
            this.$refs.disadvantageSearchInput.focus()
          }
        })
      }
    },
    showUniqueAdvantageModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.uniqueAdvantageSearchInput) {
            this.$refs.uniqueAdvantageSearchInput.focus()
          }
        })
      }
    },
    showSkillsModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.skillSearchInput) {
            this.$refs.skillSearchInput.focus()
          }
        })
      }
    },
    showSpellsModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.spellSearchInput) {
            this.$refs.spellSearchInput.focus()
          }
        })
      }
    },
    skillsMode(newVal) {
      if (newVal === 'specializations' && this.showSkillsModal) {
        this.$nextTick(() => {
          if (this.$refs.specializationSearchInput) {
            this.$refs.specializationSearchInput.focus()
          }
        })
      }
    }
  },
  mounted() {
    this.loadFromCookie()
  },
  methods: {
    getAttributeBonus(attr) {
      const bonuses = this.raceAttributeBonuses
      if (!bonuses || typeof bonuses !== 'object') return null
      
      const bonus = bonuses[attr]
      if (bonus === undefined || bonus === null) return null
      
      // Se for objeto com condition, retornar o valor
      if (typeof bonus === 'object' && bonus !== null && 'condition' in bonus) {
        return typeof bonus.value === 'number' ? bonus.value : null
      }
      
      // Bônus normal - garantir que é um número
      return typeof bonus === 'number' ? bonus : null
    },
    getAttributeBonusLabel(attr) {
      try {
        const bonuses = this.raceAttributeBonuses
        if (!bonuses || typeof bonuses !== 'object') return null
        
        const bonus = bonuses[attr]
        if (bonus === undefined || bonus === null) return null
        
        const raceName = this.character.uniqueAdvantage?.name || ''
        if (!raceName) return null
        
        // Se for objeto com condition
        if (typeof bonus === 'object' && bonus !== null && 'condition' in bonus) {
          const bonusValue = typeof bonus.value === 'number' ? bonus.value : 0
          const condition = String(bonus.condition || '')
          return `+${bonusValue} ${raceName} (${condition})`
        }
        
        // Bônus normal - garantir que é um número
        const bonusValue = typeof bonus === 'number' ? bonus : null
        if (bonusValue === null || isNaN(bonusValue)) return null
        
        return `+${bonusValue} ${raceName}`
      } catch (error) {
        console.error('Error in getAttributeBonusLabel:', error)
        return null
      }
    },
    getAttributeTotal(attr) {
      const baseValue = this.character.attributes[attr] || 0
      const bonus = this.getAttributeBonus(attr) || 0
      return baseValue + bonus
    },
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
    getAdvantageCostWithRaceDiscount(advantage) {
      if (!advantage) return 0
      
      // Se a vantagem é gratuita (freeFromRace), retorna 0
      if (advantage.freeFromRace) {
        return 0
      }
      
      // Se é vantagem bônus do Alien, usar o custo definido
      if (advantage.alienBonus) {
        return advantage.cost || 0
      }
      
      // Verificar se há desconto pela raça
      if (this.character.uniqueAdvantage && this.character.uniqueAdvantage.discountedAdvantages) {
        // Verificar desconto específico por nome
        const discount = this.character.uniqueAdvantage.discountedAdvantages.find(
          d => d.name === advantage.name
        )
        if (discount) {
          return discount.cost
        }
      }
      
      // Retornar custo normal
      return advantage.cost || 0
    },
    canAffordAdvantage(advantage) {
      return true
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
          this.showModifiersModal = true
        } else {
          // Abrir modal de quantidade
          this.advantageForQuantity = advantage
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
          this.showModifiersModal = true
        } else {
          // Adicionar vantagem diretamente se não tiver modificadores
          const advantageToAdd = { ...advantage }
          // Aplicar desconto da raça se houver
          const discountedCost = this.getAdvantageCostWithRaceDiscount(advantage)
          if (discountedCost !== advantage.cost) {
            advantageToAdd.cost = discountedCost
            advantageToAdd.discountedFromRace = this.character.uniqueAdvantage?.name
          }
          this.character.advantages.push(advantageToAdd)
          this.saveToCookie()
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
    handleConfirmAdvantageWithModifiers({ selectedModifiers, quantity }) {
      if (!this.advantageForModifiers) return
      
      const advantageToAdd = {
        ...this.advantageForModifiers,
        selectedModifiers: [...selectedModifiers]
      }
      
      // Se não houver modificadores, aplicar desconto da raça
      if (selectedModifiers.length === 0) {
        const discountedCost = this.getAdvantageCostWithRaceDiscount(this.advantageForModifiers)
        if (discountedCost !== this.advantageForModifiers.cost) {
          advantageToAdd.cost = discountedCost
          advantageToAdd.discountedFromRace = this.character.uniqueAdvantage?.name
        }
      }
      
      // Se a vantagem pode ser comprada múltiplas vezes, adicionar quantidade
      if (this.advantageForModifiers.purchasableMultiple) {
        advantageToAdd.quantity = quantity
      }
      
      // Remover propriedades que não precisam ser salvas
      delete advantageToAdd.modifiers
      delete advantageToAdd.purchasableMultiple
      
      this.character.advantages.push(advantageToAdd)
      this.saveToCookie()
      this.closeModifiersModal()
    },
    closeModifiersModal() {
      this.showModifiersModal = false
      this.advantageForModifiers = null
    },
    // Métodos para gerenciar quantidade
    canAffordAdvantageWithQuantity() {
      return true
    },
    handleConfirmAdvantageWithQuantity(quantity) {
      if (!this.advantageForQuantity) return
      
      const advantageToAdd = {
        ...this.advantageForQuantity,
        quantity: quantity
      }
      
      // Aplicar desconto da raça se houver
      const discountedCost = this.getAdvantageCostWithRaceDiscount(this.advantageForQuantity)
      if (discountedCost !== this.advantageForQuantity.cost) {
        advantageToAdd.cost = discountedCost
        advantageToAdd.discountedFromRace = this.character.uniqueAdvantage?.name
      }
      
      // Remover a propriedade purchasableMultiple do objeto salvo
      delete advantageToAdd.purchasableMultiple
      
      this.character.advantages.push(advantageToAdd)
      this.saveToCookie()
      this.closeQuantityModal()
    },
    closeQuantityModal() {
      this.showQuantityModal = false
      this.advantageForQuantity = null
      this.advantageQuantity = 1
    },
    getAdvantageTotalCost(advantage) {
      // Se for vantagem gratuita, retorna 0
      if (advantage.freeFromRace) {
        return 0
      }
      
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
        // Se não houver modificadores, verificar desconto da raça ou usar custo base
        singleCost = this.getAdvantageCostWithRaceDiscount(advantage)
        singleCost = Math.max(1, singleCost) // Mínimo de 1 ponto (exceto se for 0 por ser gratuita)
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
      if (this.character.attributes[attr] < 5) {
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
    updateTotalPoints() {
      this.saveToCookie()
    },
    saveToCookie() {
      const dataToSave = {
        characters: this.characters,
        activeTabIndex: this.activeTabIndex
      }
      setCookieObject(COOKIE_NAME, dataToSave)
    },
    loadFromCookie() {
      const savedData = getCookieObject(COOKIE_NAME)
      if (savedData) {
        // Compatibilidade com formato antigo (sem tabs)
        if (savedData.character && !savedData.characters) {
          // Migrar formato antigo para novo
          const oldCharacter = savedData.character
          const normalized = this.normalizeCharacterData(oldCharacter)
          
          this.characters = [{
            totalPoints: savedData.totalPoints || 0,
            character: normalized
          }]
          this.activeTabIndex = 0
        } else if (savedData.characters && Array.isArray(savedData.characters)) {
          // Formato novo com múltiplas fichas
          this.characters = savedData.characters.map(charData => ({
            totalPoints: charData.totalPoints || 0,
            character: this.normalizeCharacterData(charData.character)
          }))
          this.activeTabIndex = savedData.activeTabIndex || 0
          if (this.activeTabIndex >= this.characters.length) {
            this.activeTabIndex = 0
          }
        } else {
          // Dados inválidos, usar padrão
          this.characters = [{
            totalPoints: 0,
            character: this.normalizeCharacterData({})
          }]
          this.activeTabIndex = 0
        }
      }
    },
    async showConfirm(title, message, confirmText = 'Confirmar') {
      return new Promise((resolve) => {
        this.confirmModalTitle = title
        this.confirmModalMessage = message
        this.confirmModalConfirmText = confirmText
        this.confirmModalResolve = resolve
        this.showConfirmModal = true
      })
    },
    handleConfirm() {
      this.showConfirmModal = false
      if (this.confirmModalResolve) {
        this.confirmModalResolve(true)
        this.confirmModalResolve = null
      }
    },
    handleCancel() {
      this.showConfirmModal = false
      if (this.confirmModalResolve) {
        this.confirmModalResolve(false)
        this.confirmModalResolve = null
      }
    },
    async resetSheet() {
      const confirmed = await this.showConfirm(
        'Resetar Ficha',
        'Tem certeza que deseja resetar a ficha? Todos os dados serão perdidos.'
      )
      if (confirmed) {
        const defaultCharacter = {
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
          spells: [],
          experiencePoints: 0,
          background: '',
          notes: ''
        }
        this.characters[this.activeTabIndex] = {
          totalPoints: 0,
          character: { ...defaultCharacter }
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
      return true
    },
    selectUniqueAdvantage(uniqueAdv) {
      // Remover vantagens gratuitas e bônus da raça anterior se houver
        if (this.character.uniqueAdvantage && this.character.uniqueAdvantage.name) {
          const previousRaceName = this.character.uniqueAdvantage.name
          if (this.character.advantages) {
            this.character.advantages = this.character.advantages.filter(adv => {
              // Remover vantagens gratuitas da raça
              if (adv.freeFromRace && adv.freeFromRace === previousRaceName) {
                return false
              }
              // Remover vantagem bônus do Alien
              if (previousRaceName === 'Alien' && adv.alienBonus) {
                return false
              }
              return true
            })
          }
          // Remover escolha de atributo se a raça anterior tinha Característica +1
          if (this.character.uniqueAdvantage.attributeBonuses && 
              this.character.uniqueAdvantage.attributeBonuses.caracteristica) {
            if (this.character.raceAttributeChoice) {
              delete this.character.raceAttributeChoice
            }
          }
        }
        
        // Se a raça tem vantagem bônus especial (Alien), abrir modal especial
        if (uniqueAdv.bonusAdvantage) {
          this.showAlienBonusModal = true
        }
        // Se a raça tem escolha de atributo (Característica +1), abrir modal de escolha
        else if (uniqueAdv.attributeBonuses && uniqueAdv.attributeBonuses.caracteristica) {
          // Verificar se já tem escolha salva
          if (this.character.raceAttributeChoice) {
            // Já tem escolha, adicionar raça diretamente
            this.character.uniqueAdvantage = { ...uniqueAdv }
            this.saveToCookie()
          } else {
            // Abrir modal para escolher atributo
            this.raceForAttributeChoice = { ...uniqueAdv }
            this.showAttributeChoiceModal = true
          }
        }
        // Se a raça tem vantagens gratuitas, abrir modal para escolher
        else if (uniqueAdv.freeAdvantages && uniqueAdv.freeAdvantages.length > 0) {
          this.raceForFreeAdvantages = { ...uniqueAdv }
          this.selectedFreeAdvantages = {}
          this.showFreeAdvantagesModal = true
        } else {
          // Se não tem vantagens gratuitas, adicionar diretamente
          this.character.uniqueAdvantage = { ...uniqueAdv }
          this.saveToCookie()
        }
    },
    handleConfirmFreeAdvantages(selectedFreeAdvantages) {
      if (!this.raceForFreeAdvantages) return
      
      // Remover vantagens gratuitas da raça anterior se houver
      if (this.character.uniqueAdvantage && this.character.uniqueAdvantage.name) {
        const previousRaceName = this.character.uniqueAdvantage.name
        if (this.character.advantages) {
          this.character.advantages = this.character.advantages.filter(adv => 
            !adv.freeFromRace || adv.freeFromRace !== previousRaceName
          )
        }
      }
      
      // Adicionar a raça
      this.character.uniqueAdvantage = { ...this.raceForFreeAdvantages }
      
      // Adicionar vantagens gratuitas escolhidas
      if (!this.character.advantages) {
        this.character.advantages = []
      }
      
      // Processar cada vantagem gratuita
      this.raceForFreeAdvantages.freeAdvantages.forEach((freeAdv, index) => {
        if (freeAdv.type === 'choice') {
          // Adicionar a vantagem escolhida
          const selectedAdv = selectedFreeAdvantages[index]
          if (selectedAdv) {
            const advantage = advantages.find(a => a.name === selectedAdv)
            if (advantage) {
              this.character.advantages.push({
                ...advantage,
                cost: 0,
                freeFromRace: this.raceForFreeAdvantages.name
              })
            }
          }
        } else {
          // Adicionar vantagem única diretamente
          const advantage = advantages.find(a => a.name === freeAdv)
          if (advantage) {
            this.character.advantages.push({
              ...advantage,
              cost: 0,
              freeFromRace: this.raceForFreeAdvantages.name
            })
          }
        }
      })
      
      this.saveToCookie()
      this.closeFreeAdvantagesModal()
    },
    closeFreeAdvantagesModal() {
      this.showFreeAdvantagesModal = false
      this.raceForFreeAdvantages = null
    },
    handleConfirmAlienBonus({ type, advantage }) {
      if (!type || !advantage) return
      
      // Remover vantagem bônus anterior do Alien se houver
      if (this.character.advantages) {
        this.character.advantages = this.character.advantages.filter(adv => 
          !adv.alienBonus
        )
      }
      
      // Adicionar a raça Alien
      const alienRace = uniqueAdvantages.find(r => r.name === 'Alien')
      if (alienRace) {
        this.character.uniqueAdvantage = { ...alienRace }
      }
      
      // Adicionar vantagens se não existir
      if (!this.character.advantages) {
        this.character.advantages = []
      }
      
      // Encontrar a vantagem escolhida
      const advantageObj = advantages.find(a => a.name === advantage)
      if (advantageObj) {
        if (type === 'free1point') {
          // Vantagem de 1 ponto grátis
          this.character.advantages.push({
            ...advantageObj,
            cost: 0,
            alienBonus: true
          })
        } else if (type === 'discount2point') {
          // Vantagem de 2 pontos por 1 ponto
          this.character.advantages.push({
            ...advantageObj,
            cost: 1,
            alienBonus: true,
            originalCost: 2
          })
        }
      }
      
      this.saveToCookie()
      this.closeAlienBonusModal()
      
      // Se o Alien também tem escolha de atributo (Característica +1), abrir modal de escolha
      if (alienRace && alienRace.attributeBonuses && alienRace.attributeBonuses.caracteristica) {
        // Verificar se já tem escolha salva
        if (this.character.raceAttributeChoice) {
          // Já tem escolha, não precisa abrir modal novamente
        } else {
          // Abrir modal para escolher atributo
          this.raceForAttributeChoice = { ...alienRace }
          this.showAttributeChoiceModal = true
        }
      }
    },
    closeAlienBonusModal() {
      this.showAlienBonusModal = false
    },
    handleConfirmAttributeChoice(attribute) {
      if (!attribute || !this.raceForAttributeChoice) return
      
      // Salvar escolha do atributo
      this.character.raceAttributeChoice = attribute
      
      // Adicionar a raça
      this.character.uniqueAdvantage = { ...this.raceForAttributeChoice }
      
      this.saveToCookie()
      this.closeAttributeChoiceModal()
    },
    closeAttributeChoiceModal() {
      this.showAttributeChoiceModal = false
      this.raceForAttributeChoice = null
    },
    removeUniqueAdvantage() {
      // Remover vantagens gratuitas e bônus da raça quando a raça for removida
      if (this.character.uniqueAdvantage && this.character.uniqueAdvantage.name) {
        const raceName = this.character.uniqueAdvantage.name
        if (this.character.advantages) {
          this.character.advantages = this.character.advantages.filter(adv => {
            // Remover vantagens gratuitas da raça
            if (adv.freeFromRace && adv.freeFromRace === raceName) {
              return false
            }
            // Remover vantagem bônus do Alien
            if (raceName === 'Alien' && adv.alienBonus) {
              return false
            }
            return true
          })
        }
      }
      
      // Remover escolha de atributo se houver
      if (this.character.raceAttributeChoice) {
        delete this.character.raceAttributeChoice
      }
      
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
        // Adicionar perícia completa
        this.character.skills.push({
          type: 'full',
          name: skill.name,
          cost: 2
        })
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
    handleConfirmSpecializations(specializations) {
      if (specializations.length === 3) {
        if (!this.character.skills) {
          this.character.skills = []
        }
        
        this.character.skills.push({
          type: 'specializations',
          specializations: specializations.map(s => s.name),
          cost: 1
        })
        
        this.saveToCookie()
      }
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
    // Métodos para magias
    isSpellSelected(spellName) {
      if (!this.character.spells) return false
      return this.character.spells.some(spell => spell.name === spellName)
    },
    toggleSpell(spell) {
      if (!this.character.spells) {
        this.character.spells = []
      }
      
      const index = this.character.spells.findIndex(s => s.name === spell.name)
      
      if (index >= 0) {
        // Remover magia
        this.character.spells.splice(index, 1)
        this.saveToCookie()
      } else {
        // Adicionar magia
        this.character.spells.push({ ...spell })
        this.saveToCookie()
      }
    },
    removeSpell(index) {
      if (this.character.spells) {
        this.character.spells.splice(index, 1)
        this.saveToCookie()
      }
    },
    showSpellDescription(spell) {
      this.selectedSpellForDescription = spell
    },
    closeSpellDescription() {
      this.selectedSpellForDescription = null
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
    },
    // Métodos de gerenciamento de tabs
    addNewTab() {
      const defaultCharacter = {
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
        spells: [],
        experiencePoints: 0,
        background: '',
        notes: ''
      }
      this.characters.push({
        totalPoints: 0,
        character: { ...defaultCharacter }
      })
      this.activeTabIndex = this.characters.length - 1
      this.saveToCookie()
    },
    switchTab(index) {
      if (index >= 0 && index < this.characters.length) {
        this.activeTabIndex = index
        this.saveToCookie()
      }
    },
    async closeTab(index) {
      if (this.characters.length <= 1) {
        return // Não permite fechar a última aba
      }

      const hasData = this.characters[index].character.name || 
                     this.characters[index].totalPoints > 0 ||
                     Object.values(this.characters[index].character.attributes).some(v => v > 0) ||
                     (this.characters[index].character.advantages && this.characters[index].character.advantages.length > 0) ||
                     (this.characters[index].character.disadvantages && this.characters[index].character.disadvantages.length > 0) ||
                     this.characters[index].character.uniqueAdvantage ||
                     (this.characters[index].character.skills && this.characters[index].character.skills.length > 0) ||
                     (this.characters[index].character.spells && this.characters[index].character.spells.length > 0)

      if (hasData) {
        const confirmed = await this.showConfirm(
          'Fechar Ficha',
          'Esta ficha contém dados. Tem certeza que deseja fechá-la?'
        )
        if (!confirmed) {
          return
        }
      }

      this.characters.splice(index, 1)
      if (this.activeTabIndex >= this.characters.length) {
        this.activeTabIndex = this.characters.length - 1
      }
      if (this.activeTabIndex < 0) {
        this.activeTabIndex = 0
      }
      this.saveToCookie()
    },
    getTabName(char) {
      if (char.character && char.character.name && char.character.name.trim()) {
        return char.character.name
      }
      const index = this.characters.indexOf(char)
      return `Ficha ${index + 1}`
    },
    // Métodos de exportação/importação
    exportCharacterSheet() {
      const characterName = this.character.name || 'personagem'
      const sanitizedName = characterName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const fileName = `${sanitizedName}_ficha.json`

      const dataToExport = {
        totalPoints: this.totalPoints,
        character: this.character
      }

      const jsonString = JSON.stringify(dataToExport, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Feedback visual
      this.showExportSuccess()
    },
    triggerImport() {
      this.$refs.fileInput.click()
    },
    async importCharacterSheet(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        const text = await file.text()
        const data = JSON.parse(text)

        // Resetar input
        event.target.value = ''

        // Validar estrutura
        let charactersToImport = []
        let isArray = Array.isArray(data)

        if (isArray) {
          // Array de fichas
          charactersToImport = data.filter(item => {
            return this.validateCharacterData(item)
          })

          if (charactersToImport.length === 0) {
            this.$toast.error('Nenhuma ficha válida encontrada no arquivo.')
            return
          }

          if (charactersToImport.length > 1) {
            // Múltiplas fichas
            const choice = await this.showConfirm(
              'Importar Múltiplas Fichas',
              `O arquivo contém ${charactersToImport.length} fichas.\n\n` +
              'Confirmar = Adicionar como novas abas\n' +
              'Cancelar = Substituir todas as fichas atuais',
              'Adicionar como novas abas'
            )

            if (choice) {
              // Adicionar como novas abas
              charactersToImport.forEach(charData => {
                this.characters.push({
                  totalPoints: charData.totalPoints || 0,
                  character: this.normalizeCharacterData(charData.character)
                })
              })
              this.activeTabIndex = this.characters.length - 1
            } else {
              // Substituir todas
              this.characters = charactersToImport.map(charData => ({
                totalPoints: charData.totalPoints || 0,
                character: this.normalizeCharacterData(charData.character)
              }))
              this.activeTabIndex = 0
            }
          } else {
            // Uma ficha no array
            const choice = await this.showConfirm(
              'Importar Ficha',
              'O arquivo contém 1 ficha.\n\n' +
              'Confirmar = Criar nova aba\n' +
              'Cancelar = Substituir ficha atual',
              'Criar nova aba'
            )

            if (choice) {
              this.characters.push({
                totalPoints: charactersToImport[0].totalPoints || 0,
                character: this.normalizeCharacterData(charactersToImport[0].character)
              })
              this.activeTabIndex = this.characters.length - 1
            } else {
              this.characters[this.activeTabIndex] = {
                totalPoints: charactersToImport[0].totalPoints || 0,
                character: this.normalizeCharacterData(charactersToImport[0].character)
              }
            }
          }
        } else {
          // Objeto único
          if (!this.validateCharacterData(data)) {
            this.$toast.error('Formato de arquivo inválido. O arquivo deve conter dados de personagem.')
            return
          }

          const choice = await this.showConfirm(
            'Importar Ficha',
            'O arquivo contém 1 ficha.\n\n' +
            'Confirmar = Criar nova aba\n' +
            'Cancelar = Substituir ficha atual',
            'Criar nova aba'
          )

          // Verificar se data.character existe ou se data é o próprio character
          const characterData = data.character || data
          
          if (choice) {
            this.characters.push({
              totalPoints: data.totalPoints || 0,
              character: this.normalizeCharacterData(characterData)
            })
            this.activeTabIndex = this.characters.length - 1
          } else {
            this.characters[this.activeTabIndex] = {
              totalPoints: data.totalPoints || 0,
              character: this.normalizeCharacterData(characterData)
            }
          }
        }

        this.saveToCookie()
        
        // Contar fichas importadas para mensagem
        let importedCount = 1
        if (isArray) {
          importedCount = charactersToImport.length
        }
        this.showImportSuccess(importedCount)
      } catch (error) {
        console.error('Erro ao importar ficha:', error)
        this.$toast.error('Erro ao importar ficha. Verifique se o arquivo é um JSON válido.')
      }
    },
    validateCharacterData(data) {
      if (!data || typeof data !== 'object') return false
      
      // Verificar se tem character ou se é o próprio character
      const character = data.character || data
      if (!character || typeof character !== 'object') return false

      // Verificar estrutura básica
      if (!character.attributes || typeof character.attributes !== 'object') return false

      return true
    },
    normalizeCharacterData(character) {
      // Garantir que todos os campos existam
      const normalized = {
        name: character.name || '',
        attributes: {
          forca: character.attributes?.forca || 0,
          habilidade: character.attributes?.habilidade || 0,
          resistencia: character.attributes?.resistencia || 0,
          armadura: character.attributes?.armadura || 0,
          poderDeFogo: character.attributes?.poderDeFogo || 0
        },
        advantages: character.advantages || [],
        disadvantages: character.disadvantages || [],
        uniqueAdvantage: character.uniqueAdvantage || null,
        skills: character.skills || [],
        spells: character.spells || [],
        experiencePoints: character.experiencePoints || 0,
        background: character.background || '',
        notes: character.notes || ''
      }

      // Migrar perícias antigas se necessário
      if (normalized.skills && normalized.skills.length > 0) {
        normalized.skills = normalized.skills.map(skill => {
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

      // Adicionar raceAttributeChoice se existir
      if (character.raceAttributeChoice) {
        normalized.raceAttributeChoice = character.raceAttributeChoice
      }

      return normalized
    },
    showExportSuccess() {
      // Feedback simples - pode ser melhorado com toast/notificação
      const originalText = this.$el.querySelector('.btn-export')?.textContent
      if (this.$el.querySelector('.btn-export')) {
        this.$el.querySelector('.btn-export').textContent = '✓ Salvo!'
        setTimeout(() => {
          if (this.$el.querySelector('.btn-export')) {
            this.$el.querySelector('.btn-export').textContent = originalText
          }
        }, 2000)
      }
    },
    showImportSuccess(count) {
      this.$toast.success(`Ficha${count > 1 ? 's' : ''} importada${count > 1 ? 's' : ''} com sucesso!`)
    }
  }
}
</script>

<style scoped>
@import './CharacterSheet.css';
</style>

