export enum Cuisine {
  indian = 'indian',
  chinese = 'chinese',
  italian = 'italian',
  japanese = 'japanese',
  american = 'american',
}

export enum MenuItemCategory {
  Appetizer = 'Appetizer',
  MainCourse = 'MainCourse',
  Dessert = 'Dessert',
  Beverage = 'Beverage',
  SideDish = 'SideDish',
  Snack = 'Snack',
}

export const TagIcons: { [key: string]: string } = {
  All: 'data:image/png;base64,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',
  Italian:
    'https://static.vecteezy.com/system/resources/previews/049/236/679/non_2x/italian-food-icon-free-vector.jpg',
  Chinese:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdTLKweZD_mfDOmni9GZgyWe0riIRuK5Y1A&s',
  Indian: 'https://cdn-icons-png.flaticon.com/512/3014/3014404.png',
  Mexican: 'https://static.thenounproject.com/png/4764259-200.png',
  Appetizer:
    'https://static.vecteezy.com/system/resources/previews/020/121/775/non_2x/appetizer-icon-design-free-vector.jpg',
  MainCourse:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFwmf0fKZbRzxzRskb1NYP0o7ZV6CzzIYZw&s',
  Dessert:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLtYwod7oax8QzKlIxWNJRe25Bu0k2hupUiw&s',
  Beverage: 'https://cdn-icons-png.flaticon.com/512/175/175782.png',
  Japanese:
    'https://w7.pngwing.com/pngs/504/933/png-transparent-japanese-cuisine-icon-sushi-computer-icons-sake-a-pair-of-chopsticks-food-seafood-cuisine-thumbnail.png',
};
