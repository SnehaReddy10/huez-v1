import { useContext, useEffect, useRef, useState } from 'react';
import TagButton from '../buttons/tag-button/TagButton';
import {
  useAddToCartMutation,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
  useGetTagsQuery,
} from '../../store';
import { ToastContext } from '../../context/ToastContext';
import { MenuItem } from './MenuItem';
import { MenuSkeletonLoader } from '../loaders/MenuSkeletonLoader';
import { FixedSizeGrid as Grid } from 'react-window';
import { getToken } from '../../utitlities';
import ProductNotFound from './ProductNotFound';

enum SearchCriteria {
  Veg = 'Veg',
  Vegan = 'Vegan',
  Japanese = 'Japanese',
  Chinese = 'Chinese',
  Asian = 'Asian',
  Desserts = 'Desserts',
  Drinks = 'Drinks',
  AllMenu = 'All',
  MainCourse = 'Main Course',
}

function Menu() {
  const [addProduct, addProductResults] = useAddToCartMutation();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const gridRef = useRef<any>(null);
  const [gridHeight, setGridHeight] = useState(window.innerHeight);
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const [scrollPosition, setScrollPosition] = useState(0);
  const columnCount = Math.max(1, Math.floor(gridWidth / 605));
  const rowCount = Math.ceil(menuItems?.length / columnCount) + 1;
  const observerRef = useRef<HTMLDivElement>(null);
  const toastContext = useContext(ToastContext);
  const [cursor, setCursor] = useState<string | null>();
  const [token] = useState(getToken());
  const [searchCriteria, setSearchCriteria] = useState<{
    id: number;
    label: SearchCriteria;
    type: string;
  }>({
    id: 1,
    label: SearchCriteria.AllMenu,
    type: 'category',
  });

  const getQueryFilter = () => {
    if (searchCriteria.label === SearchCriteria.Veg) {
      return { isVeg: true };
    }
    if (searchCriteria.label === SearchCriteria.Vegan) {
      return { isVegan: true };
    }
    if (searchCriteria.type === 'cuisine') {
      return { cuisine: searchCriteria.label?.toLowerCase() };
    }
    if (searchCriteria.type === 'category') {
      return { category: searchCriteria.label };
    }
    return {};
  };

  const { data: tags } = useGetTagsQuery({});

  const {
    data: products,
    isFetching,
    error: getproductsError,
  } = useGetProductsQuery({ limit: 20, cursor });

  const {
    data: productsByCategory,
    isFetching: isProductsByCategoryFetching,
    error: getproductsByCategoryError,
  } = useGetProductsByCategoryQuery(getQueryFilter(), {
    skip: searchCriteria.label === SearchCriteria.AllMenu,
  });

  const handleScroll = ({ scrollTop }: { scrollTop: number }) => {
    const totalHeight = (Math.ceil(menuItems.length / 2) + 1) * 400;

    if (
      scrollTop + gridHeight >= totalHeight - 100 &&
      !isFetching &&
      products?.nextCursor !== cursor
    ) {
      setScrollPosition(scrollTop);
      setCursor(products?.nextCursor);
    }
  };

  const Row = ({ columnIndex, rowIndex, style }: any) => {
    const itemIndex = rowIndex * 2 + columnIndex;
    if (itemIndex >= menuItems.length) return null;

    return (
      <div style={{ ...style }}>
        <MenuItem
          addProductToCart={token ? addProduct : addToCart}
          item={menuItems[itemIndex]}
          align={rowIndex % 2 === 0 ? 'left' : 'right'}
        />
      </div>
    );
  };

  const addToCart = (product: any) => {
    console.log('cart');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    function handleResize() {
      setGridHeight(window.innerHeight);
      setGridWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.scrollTop = scrollPosition;
    }
  }, [products]);

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
      const error = r?.data?.message ?? r?.data?.error ?? r?.data.error[0];
      showToast(error, 'error', 'right-0 top-10');
    }

    if (addProductResults.isSuccess) {
      showToast(
        addProductResults.data.message,
        'success',
        'right-0 top-10 fixed'
      );
    }
  }, [addProductResults.error, addProductResults, searchCriteria]);

  useEffect(() => {
    if (searchCriteria.label !== SearchCriteria.AllMenu) {
      setMenuItems(productsByCategory?.data);
    } else if (products?.data) {
      setMenuItems((prev) => [...prev, ...products.data]);
    }
  }, [products, productsByCategory, searchCriteria]);

  return (
    <div
      className={`w-full selection:bg-transparent overflow-hidden min-h-screen justify-center items-center`}
    >
      <div className="flex gap-3 p-4 items-center justify-center">
        {tags?.data?.map((x: any) => (
          <TagButton
            label={x.label.toString()}
            key={x.id}
            icon={x.icon}
            isSelected={x.label === searchCriteria.label}
            onClick={() => setSearchCriteria(x)}
            className="px-2 py-4 text-wrap w-14"
          />
        ))}
      </div>
      {isFetching || isProductsByCategoryFetching ? (
        <MenuSkeletonLoader />
      ) : (
        <div className="w-full h-full">
          {menuItems?.length > 0 ? (
            <>
              <Grid
                className="custom-grid"
                ref={gridRef}
                outerRef={observerRef}
                columnCount={columnCount}
                columnWidth={gridWidth / columnCount}
                rowCount={rowCount}
                rowHeight={400}
                height={gridHeight}
                width={gridWidth}
                onScroll={handleScroll}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const itemIndex = rowIndex * columnCount + columnIndex;

                  if (itemIndex >= menuItems.length) {
                    return null;
                  }

                  return (
                    <Row
                      columnIndex={columnIndex}
                      rowIndex={rowIndex}
                      style={style}
                    />
                  );
                }}
              </Grid>
            </>
          ) : (
            <ProductNotFound />
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
