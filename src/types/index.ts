export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
};

export type Filter = {
  id: string;
  name: string;
  image_url: string;
};

export type OpenStatus = {
  restaurant_id: string;
  is_open: boolean;
};

export type PriceRange = {
  id: string;
  range: string;
};

export type RestaurantsResponse = { restaurants: Restaurant[] };
export type FiltersResponse = { filters: Filter[] };
