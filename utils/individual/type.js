const readJSON = require("../data").getDataFromJSON;
const typeData = readJSON("assets/json/typeData.json");

const generateTypeRelation = (type1, type2) => {
  const { defenseAttackMatrix, attackDefenseMatrix, name } = typeData;
  const index1 = name.findIndex((n) => n === type1),
    index2 = name.findIndex((n) => n === type2);
  const customAttackDefense = [],
    customDefenseAttack = [];
  for (let i = 0; i < 18; i++) {
    customDefenseAttack.push(
      defenseAttackMatrix[index1][i] * defenseAttackMatrix[index2][i]
    );
    customAttackDefense.push(
      attackDefenseMatrix[index1][i] * attackDefenseMatrix[index2][i]
    );}
  return {
    attackDefenseMatrix: customAttackDefense,
    defenseAttackMatrix: customDefenseAttack,
  };
};

const getOffensiveRating = (type1, type2 = undefined) => {
  if (type2 === undefined) {
    return typeData.classification.find((c) => c.name === type1)
      .offensiveRating;
  } else {
    const { typeDistribution } = typeData;
    const customRelation = generateTypeRelation(
      type1,
      type2
    ).attackDefenseMatrix;
    let score = 100;

    customRelation.map((r, idx) => {
      if (r !== 1) {
        if (r > 1) {
          score += (typeDistribution[idx] / 1426) * 100;
        } else if (r > 0.5) {
          score -= (typeDistribution[idx] / 1426) * 100;
        } else {
          score -= (typeDistribution[idx] / 1426) * 150;
        }
      }
    });

    return score;
  }
};

const getDefensiveRating = (type1, type2 = undefined) => {
  if (type2 === undefined) {
    return typeData.classification.find((c) => c.name === type1)
      .defensiveRating;
  } else {
    const { typeDistribution } = typeData;
    const customRelation = generateTypeRelation(
      type1,
      type2
    ).defenseAttackMatrix;
    let score = 100;

    customRelation.map((r, idx) => {
      if (r !== 1) {
        if (r > 1) {
          score -= (typeDistribution[idx] / 1426) * 100;
        } else if (r > 0.5) {
          score += (typeDistribution[idx] / 1426) * 100;
        } else {
          score += (typeDistribution[idx] / 1426) * 150;
        }
      }
    });

    return score;
  }
};

const getTypeRating = (typeObject) => {
  if (typeObject.quantity === 1) {
    return {
      type: typeObject.type1,
      offensiveRating: getOffensiveRating(typeObject.type1),
      defensiveRating: getDefensiveRating(typeObject.type1),
    };
  } else {
    return {
      type: typeObject.type1 + "-" + typeObject.type2,
      offensiveRating: getOffensiveRating(typeObject.type1, typeObject.type2),
      defensiveRating: getDefensiveRating(typeObject.type1, typeObject.type2),
    };
  }
};

module.exports = {
  getTypeRating,
};
