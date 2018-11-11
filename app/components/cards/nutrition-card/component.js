import Component from '@ember/component';
import { notEmpty } from '@ember-decorators/object/computed';
import { computed } from '@ember-decorators/object';
import { reduce } from 'lodash-es';

const rdaMap = {
        "calories": 2000,
        "calories_from_fat": 780,
        "fat_grams": 78,
        "saturated_fat_grams": 20,
        "trans_fat_grams": 0,
        "cholesterol_milligrams": 300,
        "sodium_milligrams": 2300,
        "carbohydrate_grams": 275,
        "fiber_grams": 28,
        "new_fiber_grams": 28,
        "sugar_grams": 30,
        "added_sugar_grams": 20,
        "sugar_alcohol_grams": 20,
        "protein_grams": 50,
        "vitamin_a_IU": 3000,
        "vitamin_c_milligrams": 90,
        "calcium_milligrams": 1300,
        "iron_milligrams": 18,
        "potassium_milligrams": 4700,
        "fat_polyunsaturated_grams": 0,
        "fat_monounsaturated_grams": 0,
        "magnesium_milligrams": 420,
        "zinc_milligrams": 11,
        "copper_milligrams": 0.9,
        "manganese_milligrams": 2.3,
        "selenium_micrograms": 55,
        "thiamin_milligrams": 1.2,
        "riboflavin_milligrams": 1.3,
        "niacin_milligrams": 16,
        "pantothenic_acid_milligrams": 5,
        "vitamin_b6_milligrams": 1.7,
        "folate_micrograms": 400,
        "vitamin_b12_micrograms": 2.4,
        "vitamin_e_milligrams": 15,
        "vitamin_d_IU": 800,
        "vitamin_k_micrograms": 120,
        "phosphorus_milligrams": 1250
      };

export default class CardsNutritionCardComponent extends Component {
  @notEmpty('title') hasTitle;

  @computed('data.nutrition')
  get nutr() {

    return reduce(this.data.nutrition, (acc, cur, key) => {
      let qData = {
        q: parseFloat(cur).toFixed(0)
      }

      let pData = {};

      if(rdaMap[key]) {
        pData = {
          p: parseFloat(cur/rdaMap[key] * 100).toFixed(0)
        }
      }

      const merged = Object.assign(qData, pData);

      return Object.assign(acc, {[key]: merged});
    }, {})
  }


}
