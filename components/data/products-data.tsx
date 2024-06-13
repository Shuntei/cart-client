interface productsItem {
  id: string;
  price: number;
  quantity: number;
  description: string;
}

const productsData: productsItem[] = [
  {
    id: "w1",
    price: 200,
    quantity: 1,
    description: "與各種褲子完美搭配，展現出俐落的街頭風格。",
  },
  {
    id: "w2",
    price: 350,
    quantity: 1,
    description: "百搭且永不過時，適合各種場合的必備單品。",
  },
  {
    id: "w3",
    price: 250,
    quantity: 1,
    description: "帶來浪漫氣息，輕盈舒適，是春夏季節的不二選擇。",
  },
  {
    id: "w4",
    price: 500,
    quantity: 1,
    description: "增添一抹酷感，輕鬆駕馭多種風格，從休閒到正式皆宜。",
  },
  {
    id: "w5",
    quantity: 1,
    price: 250,
    description: "保暖且時尚，適合秋冬季節的出街裝扮。",
  },
  {
    id: "w6",
    price: 300,
    quantity: 1,
    description: "柔軟舒適，簡單搭配牛仔褲或裙子就能出門。",
  },
  {
    id: "w7",
    price: 500,
    quantity: 1,
    description: "輕鬆展現運動風範，無論是健身還是休閒都非常適合。",
  },
  {
    id: "w8",
    price: 450,
    quantity: 1,
    description: "充滿少女感，輕盈飄逸，適合約會或度假穿著。",
  },
  {
    id: "w9",
    price: 300,
    quantity: 1,
    description: "精緻優雅，細節處見心思，適合上班或聚會。",
  },
  {
    id: "w10",
    price: 450,
    quantity: 1,
    description: "展現青春活力，適合炎熱夏季，搭配簡單T恤即可。",
  },
];

export default productsData;
