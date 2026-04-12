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

const generateBooks = () => {
  const books = [];
  // Generate 26 books for each category so they exceed the 28 display limit, 
  // ensuring pagination is active for EVERY single category
  CATEGORY_NAMES.forEach((category, catIdx) => {
    for (let i = 0; i < 35; i++) {
      const globalIdx = catIdx * 35 + i;
      books.push({
        id: `book-${globalIdx}`,
        title: `The Art of ${TITLE_SUFFIXES[globalIdx % TITLE_SUFFIXES.length]} Volume ${i + 1}`,
        author: AUTHORS[globalIdx % AUTHORS.length],
        price: 15 + (globalIdx * 1.5) % 40,
        rating: parseFloat((4 + (globalIdx % 10) / 10).toPrecision(2)),
        category: category,
        coverUrl: `https://images.unsplash.com/photo-${BOOK_COVERS[globalIdx % BOOK_COVERS.length]}?auto=format&fit=crop&q=80&w=400`,
        language: globalIdx % 2 === 0 ? "English" : "Spanish"
      });
    }
  });
  return books;
};

export const ALL_BOOKS = generateBooks();

export const getBookCountByCategory = (category: string) => {
  return ALL_BOOKS.filter(b => b.category === category).length;
};
