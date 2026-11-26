// MODUL 3 - Service resep: mengambil data dari External API
// lalu memasukkannya ke dalam object berbasis Interface.
import { ApiResponse, RecipeDto } from "../types/api";
import { OnlineRecipe } from "../types/recipe";
import { delay } from "../utils/delay";
import { fetchJson } from "./api";

// Mengubah data mentah server (RecipeDto) -> object OnlineRecipe
const mapDtoToRecipe = (dto: RecipeDto): OnlineRecipe => ({
  id: dto.id,
  name: dto.name,
  category: dto.category,
  price: dto.price,
  cookTime: dto.cookTime,
  ingredients: dto.ingredients,
  steps: dto.steps,
  note: dto.note ?? undefined,
  imageUrl: dto.imageUrl ?? undefined,
});

// Versi .then() / Promise.reject()
// Tidak memakai kata kunci async: semua alurnya lewat rantai .then()
export function searchRecipes(
  keyword: string,
  category: string,
): Promise<OnlineRecipe[]> {
  const params: string[] = [];
  if (keyword.trim()) params.push("q=" + encodeURIComponent(keyword.trim()));
  if (category) params.push("category=" + encodeURIComponent(category));
  const endpoint =
    "/recipes" + (params.length > 0 ? "?" + params.join("&") : "");

  return fetchJson<ApiResponse<RecipeDto[]>>(endpoint)
    .then((response) =>
      // Server membalas success=false -> ubah jadi Promise yang di-reject
      response.success
        ? response.data
        : Promise.reject(new Error(response.message)),
    )
    .then((list) => list.map(mapDtoToRecipe));
}

// Custom async function (async/await) yang memakai fungsi di atas.
// delay() kita buat sendiri; fetch() di api.ts adalah pre-built async function.
export const getOnlineRecipes = async (
  keyword: string,
  category: string,
): Promise<OnlineRecipe[]> => {
  await delay(400); // simulasi server lambat supaya loading terlihat
  const recipes = await searchRecipes(keyword, category);
  return recipes;
};
