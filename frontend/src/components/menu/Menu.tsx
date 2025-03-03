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
  const rowCount = Math.ceil(menuItems.length / columnCount) + 1;
  const observerRef = useRef<HTMLDivElement>(null);
  const toastContext = useContext(ToastContext);
  const [cursor, setCursor] = useState<string | null>();
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
      return { cuisine: searchCriteria.label };
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
          addProductToCart={addProduct}
          item={menuItems[itemIndex]}
          align={rowIndex % 2 === 0 ? 'left' : 'right'}
        />
      </div>
    );
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
      showToast(
        r?.data?.message ?? r?.data?.error?.length > 0 ?? r.data.error[0],
        'error',
        'right-0 top-10'
      );
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
    if (productsByCategory?.data) {
      setMenuItems(productsByCategory.data);
    } else if (products?.data) {
      setMenuItems((prev) => [...prev, ...products.data]);
    }
  }, [products, productsByCategory]);

  return (
    <div
      className={`w-full selection:bg-transparent overflow-hidden min-h-screen justify-center items-center`}
    >
      <div className="flex gap-2 p-4 items-center justify-center">
        {tags?.data?.map((x: any) => (
          <TagButton
            label={x.label.toString()}
            key={x.id}
            icon={null}
            isSelected={x.label === searchCriteria.label}
            onClick={() => setSearchCriteria(x)}
          />
        ))}
      </div>
      {isFetching || isProductsByCategoryFetching ? (
        <MenuSkeletonLoader />
      ) : (
        <div className="w-full h-full">
          {menuItems.length > 0 ? (
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
            <div className="flex justify-center items-center">
              <h1 className="text-2xl">No items found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
