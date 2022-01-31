const avataaarsData = {
  'avatar-style': ['Circle', 'Transparent'],
  topType: [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairMiaWallace',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairSides',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart'
  ],
  accessoriesType: [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers'
  ],
  hairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray'
  ],
  facialHairType: [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMagestic',
    'MoustacheFancy',
    'MoustacheMagnum'
  ],
  clotheType: [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck'
  ],
  eyeType: [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky'
  ],
  eyebrowType: [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural'
  ],
  mouthType: [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit'
  ],
  skinColor: [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black'
  ]
}

const avatarGenerator = () => {
  const topType =
    avataaarsData.topType[
      Math.floor(Math.random() * avataaarsData.topType.length)
    ]

  const accessoriesType =
    avataaarsData.accessoriesType[
      Math.floor(Math.random() * avataaarsData.accessoriesType.length)
    ]

  const hairColor =
    avataaarsData.hairColor[
      Math.floor(Math.random() * avataaarsData.hairColor.length)
    ]

  const facialHairType =
    avataaarsData.facialHairType[
      Math.floor(Math.random() * avataaarsData.facialHairType.length)
    ]

  const clotheType =
    avataaarsData.clotheType[
      Math.floor(Math.random() * avataaarsData.clotheType.length)
    ]

  const eyeType =
    avataaarsData.eyeType[
      Math.floor(Math.random() * avataaarsData.eyeType.length)
    ]

  const eyebrowType =
    avataaarsData.eyebrowType[
      Math.floor(Math.random() * avataaarsData.eyebrowType.length)
    ]

  const mouthType =
    avataaarsData.mouthType[
      Math.floor(Math.random() * avataaarsData.mouthType.length)
    ]

  const skinColor =
    avataaarsData.skinColor[
      Math.floor(Math.random() * avataaarsData.skinColor.length)
    ]

  const avatarUrl = `https://avataaars.io/?avatarStyle=Circle&topType=${topType}&accessoriesType=${accessoriesType}&hairColor=${hairColor}&facialHairType=${facialHairType}&clotheType=${clotheType}&eyeType=${eyeType}&eyebrowType=${eyebrowType}&mouthType=${mouthType}&skinColor=${skinColor}`

  return avatarUrl
}

module.exports = avatarGenerator
