export type Area = {
    code: string;
    name: string;
};

export type Genre = {
    name: string;
    catch: string;
    code: string;
};

export type Budget = {
    code: string;
    name: string;
    average: string;
};

export type PhotoUrls = {
    l: string;
    m: string;
    s: string;
};

export type Photo = {
    pc: PhotoUrls;
    mobile: PhotoUrls;
};

export type Urls = {
    pc: string;
};

export type CouponUrls = {
    pc: string;
    sp: string;
};

export type Shop = {
    id: string;
    name: string;
    logo_image: string;
    name_kana: string;
    address: string;
    station_name: string;
    ktai_coupon: number;
    large_service_area: Area;
    service_area: Area;
    large_area: Area;
    middle_area: Area;
    small_area: Area;
    lat: number;
    lng: number;
    genre: Genre;
    budget: Budget;
    catch: string;
    capacity: number;
    access: string;
    mobile_access: string;
    urls: Urls;
    photo: Photo;
    open: string;
    close: string;
    party_capacity: number;
    other_memo: string;
    shop_detail_memo: string;
    budget_memo: string;
    wedding: string;
    course: string;
    free_drink: string;
    free_food: string;
    private_room: string;
    horigotatsu: string;
    tatami: string;
    card: string;
    non_smoking: string;
    charter: string;
    parking: string;
    barrier_free: string;
    show: string;
    karaoke: string;
    band: string;
    tv: string;
    lunch: string;
    midnight: string;
    english: string;
    pet: string;
    child: string;
    wifi: string;
    coupon_urls: CouponUrls;
};


export type Range = {
    code: string;
    name: string;
};
// export type Shop = {
//     name: string;
//     logo_image: string | null;
//     address: string;
//     url: string;
//     large_service_area: Area;
//     large_area: Area;
//     middle_area: Area;
//     small_area: Area;
//     genre: Genre;
// };