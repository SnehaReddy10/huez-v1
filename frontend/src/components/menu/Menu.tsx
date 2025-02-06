import { useContext, useEffect, useState } from 'react';
import TagButton from '../buttons/TagButton';
import {
  useAddToCartMutation,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from '../../store';
import { ToastContext } from '../../context/ToastContext';
import Loader from '../common/Loader';
import { MenuItem } from './MenuItem';

enum SearchCriteria {
  Veg = 'Veg',
  Vegan = 'Vegan',
  Japanese = 'Japanese',
  Chinese = 'Chinese',
  Asian = 'Asian',
  Desserts = 'Desserts',
  Drinks = 'Drinks',
  AllMenu = 'All Menu',
  MainCourse = 'Main Course',
}

const tags = [
  {
    id: 1,
    label: SearchCriteria.AllMenu,
  },
  {
    id: 2,
    label: SearchCriteria.MainCourse,
  },
  {
    id: 3,
    label: SearchCriteria.Desserts,
  },
  {
    id: 4,
    label: SearchCriteria.Drinks,
  },
  {
    id: 5,
    label: SearchCriteria.Asian,
  },
  {
    id: 6,
    label: SearchCriteria.Chinese,
  },
];

function Menu() {
  const [addProduct, addProductResults] = useAddToCartMutation();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | string>(
    SearchCriteria.AllMenu
  );
  let items: any = [];
  const {
    data: products,
    isFetching,
    error: getproductsError,
  } = useGetProductsQuery({
    isVeg: searchCriteria == SearchCriteria.Veg,
    isVegan: searchCriteria == SearchCriteria.Vegan,
    cuisine: searchCriteria,
    category: searchCriteria,
  });
  const {
    data: productsByCategory,
    isFetching: isProductsByCategoryFetching,
    error: getproductsByCategoryError,
  } = useGetProductsByCategoryQuery({});

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (!toastContext) {
      throw new Error('useContext must be used within a ToastProvider');
    }
    const { showToast } = toastContext;

    if (
      addProductResults.error ||
      getproductsError ||
      getproductsByCategoryError
    ) {
      const r =
        (addProductResults.error as any) ??
        (getproductsError as any) ??
        (getproductsByCategoryError as any);
      showToast(r.data.message ?? r.data.error[0], 'error', 'right-0 top-10');
    }

    if (addProductResults.isSuccess) {
      showToast(
        addProductResults.data.message,
        'success',
        'right-0 top-10 fixed'
      );
    }
  }, [addProductResults.error, addProductResults]);

  if (isFetching || isProductsByCategoryFetching) {
    return <Loader />;
  }
  items =
    searchCriteria ?? SearchCriteria.AllMenu ? products : productsByCategory;

  return (
    <div className={`w-full selection:bg-transparent`}>
      <div className="flex gap-2 p-4 items-center justify-center">
        {tags.map((x) => (
          <TagButton
            label={x.label.toString()}
            key={x.id}
            icon={null}
            isSelected={x.label === searchCriteria}
            onClick={() => setSearchCriteria(x.label)}
          />
        ))}
      </div>
      <div className="grid 2xl:grid-cols-2">
        {items?.data?.map((x: any, i: number) => (
          <div key={x.id}>
            {i % 2 === 0 && (
              <div key={x.id} className="mr-8">
                <MenuItem addProductToCart={addProduct} item={x} align="left" />
              </div>
            )}
            {i % 2 !== 0 && (
              <div key={x.id} className="flex justify-end items-end">
                <MenuItem
                  addProductToCart={addProduct}
                  item={x}
                  className="flex-row-reverse"
                  align="right"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="2xl:w-[40%]"></div>
    </div>
  );
}

export default Menu;
