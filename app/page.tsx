import SearchBar from '@/components/ui/search-bar';
import CategoryGrid from '@/components/ui/category-grid';
import ProfessionalList from '@/components/ui/professional-list';
import SearchFilters from '@/components/ui/search-filters';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Passaparola Digitale
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Trova i migliori professionisti verificati nella tua zona
        </p>
        <SearchBar />
        <SearchFilters />
        <CategoryGrid />
        <ProfessionalList />
      </div>
    </main>
  );
}