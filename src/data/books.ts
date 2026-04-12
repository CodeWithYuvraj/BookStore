export const CATEGORY_NAMES = [
  "Fiction", "Design & Art", "Programming", "Science", "History", "Travel", "Music", 
  "Film & Media", "Romance", "Fantasy", "Technology", "Nature", "Finance", "Psychology", 
  "Art History", "Adventure", "Astronomy", "Action & War", "Children's", "Non-Fiction"
];

const BOOK_COVERS = [
  "1544947950-fa07a98d237f",
  "1512820790803-83ca734da794",
  "1589829085413-56de8ae18c73",
  "1481627834876-b7833e8f5570",
  "1495446815901-a7297e633e8d",
  "1524578271613-d550eacf6090",
  "1457369804613-52c61a468e7d"
];

const AUTHORS = [
  "Don Norman", "Robert C. Martin", "Martin Fowler", "Kent Beck", 
  "Linus Torvalds", "Jane Austen", "J.K. Rowling", "J.R.R. Tolkien",
  "Stephen Hawking", "Neil deGrasse Tyson", "Isaac Asimov", "George R.R. Martin"
];

const TITLE_SUFFIXES = [
  "Programming", "Design", "Writing", "Thinking", "Leadership", 
  "Creative Coding", "Science", "History", "Music", "War", "Finance", "Nature"
];

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  category: string;
  coverUrl: string;
  language: string;
  description: string;
  pages: number;
  publisher: string;
  publicationDate: string;
  images: string[];
}

const generateBooks = () => {
  const books: Book[] = [];
  // Generate 26 books for each category so they exceed the 28 display limit, 
  // ensuring pagination is active for EVERY single category
  CATEGORY_NAMES.forEach((category, catIdx) => {
    for (let i = 0; i < 35; i++) {
      const globalIdx = catIdx * 35 + i;
      const primaryCover = `https://images.unsplash.com/photo-${BOOK_COVERS[globalIdx % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=400`;
      
      books.push({
        id: `book-${globalIdx}`,
        title: `The Art of ${TITLE_SUFFIXES[globalIdx % TITLE_SUFFIXES.length]} Volume ${i + 1}`,
        author: AUTHORS[globalIdx % AUTHORS.length],
        price: 15 + (globalIdx * 1.5) % 40,
        rating: parseFloat((4 + (globalIdx % 10) / 10).toPrecision(2)),
        category: category,
        coverUrl: primaryCover,
        language: globalIdx % 2 === 0 ? "English" : "Spanish",
        description: `This is a comprehensive guide exploring ${category} from a unique perspective. Written by ${AUTHORS[globalIdx % AUTHORS.length]}, this volume dives deep into the fundamentals and advanced concepts that shape our understanding of the field. A must-read for both beginners and seasoned professionals looking to expand their knowledge base. The book offers practical insights alongside theoretical frameworks, making it an invaluable addition to your library.`,
        pages: 200 + (globalIdx * 7) % 300,
        publisher: "BookVerse Publishing House",
        publicationDate: `202${globalIdx % 6}-0${(globalIdx % 9) + 1}-1${(globalIdx % 9) + 1}`,
        images: [
          primaryCover,
          `https://images.unsplash.com/photo-${BOOK_COVERS[(globalIdx + 1) % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=400`,
          `https://images.unsplash.com/photo-${BOOK_COVERS[(globalIdx + 2) % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=400`
        ]
      });
    }
  });
  return books;
};

export const BOOKS = generateBooks();

export const getBookCountByCategory = (category: string) => {
  return BOOKS.filter(b => b.category === category).length;
};
