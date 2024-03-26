 const  classicMovies = [
    {
      title: "Interstellar",
      rating: "PG-13",
      duration: 169,
      genre: ["Adventure", "Drama", "Sci-Fi"],
      description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Interstellar_5.jpeg'
    },
    {
      title: "Gran Torino",
      rating: "R",
      duration: 116,
      genre: ["Drama"],
      description: "After a Hmong teenager tries to steal his prized 1972 Gran Torino, a disgruntled, prejudiced Korean War veteran seeks to redeem both the boy and himself.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Gran%20Torino_5.jpeg'
    },
    {
      title: "The Green Mile",
      rating: "R",
      duration: 189,
      genre: ["Crime", "Drama", "Fantasy"],
      description: "A tale set on death row in a Southern jail, where gentle giant John possesses the mysterious power to heal people's ailments. When the lead guard, Paul, recognizes John's gift, he tries to help stave off the condemned man's execution.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Green%20Mile_5.jpeg'
    },
    {
      title: "The Shawshank Redemption",
      rating: "R",
      duration: 142,
      genre: ["Drama"],
      description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Shawshank%20Redemption_5.jpeg'
    },
    
    {
      title: "Braveheart",
      rating: "R",
      duration: 178,
      genre: ["Biography", "Drama", "History"],
      description: "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Braveheart_5.jpeg'
    },
    {
      title: "Titanic",
      rating: "PG-13",
      duration: 194,
      genre: ["Drama", "Romance"],
      description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Titanic_5.jpeg'
    },
    {
      title: "12 Angry Men",
      rating: "Approved",
      duration: 96,
      genre: ["Crime", "Drama"],
      description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/12%20Angry%20Men_5.jpeg'
    },
    {
      title: "Mad Max Fury Road",
      rating: "R",
      duration: 120,
      genre: ["Action", "Adventure", "Sci-Fi"],
      description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Mad%20Max%20Fury%20Road_5.jpeg'
    },
    {
      title: "The Dark Knight",
      rating: "PG-13",
      duration: 152,
      genre: ["Action", "Crime", "Drama"],
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Dark%20Knight_5.jpeg'
    },
    {
      title: "Rear Window",
      rating: "PG",
      duration: 112,
      genre: ["Mystery", "Thriller"],
      description: "A photographer in a wheelchair spies on his neighbors from his Greenwich Village courtyard apartment window and becomes convinced one of them has committed murder, despite the skepticism of his fashion-model girlfriend.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Rear%20Window_5.jpeg'
    },
    {
      title: "The Godfather",
      rating: "R",
      duration: 175,
      genre: ["Crime", "Drama"],
      description: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Godfather_5.jpeg'
    },
    {
      title: "The Godfather Part II",
      rating: "R",
      duration: 202,
      genre: ["Crime", "Drama"],
      description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Godfather%20Part%20II_5.jpeg'
    },
    {
      title: "Scarface",
      rating: "18+",
      duration: 170,
      genre: ["Crime", "Drama"],
      description: "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Scarface_5.jpeg'
    },
    {
      title: "The Good the Bad and the Ugly",
      rating: "Approved",
      duration: 178,
      genre: ["Adventure", "Western"],
      description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Good%20the%20Bad%20and%20the%20Ugly_5.jpeg'
    },
    {
      title: "Apocalypse Now",
      rating: "R",
      duration: 147,
      genre: ["Drama", "Mystery", "War"],
      description: "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Apocalypse%20Now_5.jpeg'
    },
    {
      title: "The Missouri Breaks",
      rating: "PG",
      duration: 126,
      genre: ["Drama", "Western"],
      description: "Tom Logan is a horse thief. Rancher David Braxton has horses, and a daughter, worth stealing. But Braxton has just hired Lee Clayton, an infamous 'regulator', to hunt down the horse thieves; one at a time.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/The%20Missouri%20Breaks_5.jpeg?t=2023-12-07T20%3A19%3A02.366Z'
    },
    {
      title: "Gladiator",
      rating: "R",
      duration: 155,
      genre: ["Action", "Adventure", "Drama"],
      description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Gladiator_5.jpeg'
    },
    {
      title: "Face Off",
      rating: "R",
      duration: 138,
      genre: ["Action", "Crime", "Sci-Fi"],
      description: "To foil a terrorist plot, FBI agent Sean Archer assumes the identity of the criminal Castor Troy who murdered his son through facial transplant surgery, but the crook wakes up prematurely and vows revenge.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Face%20Off_5.jpeg'
    },
    {
      title: "There Will Be Blood",
      rating: "R",
      duration: 158,
      genre: ["Drama"],
      description: "A story of family, religion, hatred, oil, and madness, focusing on a turn-of-the-century prospector in the early days of the business.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/There%20Will%20Be%20Blood_5.jpeg'
    },
    {
      title: "No Country for Old Men",
      rating: "R",
      duration: 122,
      genre: ["Crime", "Drama", "Thriller"],
      description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/No%20Country%20for%20Old%20Men_5.jpeg'
    },
    {
      title: "Gangs of New York",
      rating: "R",
      duration: 167,
      genre: ["Crime", "Drama"],
      description: "In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.",
      image: 'https://ebmdpaztusgpdjuuktzz.supabase.co/storage/v1/object/public/Images/Random/Gangs%20of%20New%20York_5.jpeg'
    },
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(classicMovies);
  
  export default classicMovies;
  
