const paragraphs = [
    // Dragon Ball Z
    "Goku's Kamehameha wave shattered the mountains as Vegeta fired his Final Flash. The Saiyans clashed with earth-shaking force, their auras blazing like supernovas. Krillin and Piccolo watched in awe while Frieza cackled from his hovering throne. The Z Fighters knew this battle would determine Earth's fate. With a sudden burst of speed, Goku transformed into Super Saiyan Blue, his hair glowing with divine energy.",

    // One Piece
    "Luffy stretched his rubber arm to grab onto the Thousand Sunny's mast as Zoro sliced through a marine battleship with his three swords. Nami charted their course while Sanji kicked a Sea King in the face. The Straw Hat Pirates laughed as they sailed toward the next island, where the One Piece might finally be found. Usopp's tall tales couldn't compare to the actual adventures they experienced in the Grand Line.",

    // Naruto
    "Naruto formed the hand signs for Rasengan as Sasuke's Sharingan spun wildly. Sakura punched the ground, creating a massive crater, while Kakashi watched with his single visible eye. The Hidden Leaf Village stood in ruins after Pain's assault, but the Will of Fire still burned brightly. 'Believe it!' Naruto shouted, his Nine-Tails chakra flaring to life.",

    // Demon Slayer
    "Tanjiro's Water Breathing technique created beautiful arcs in the moonlight as Nezuko kicked a demon's head clean off. Zenitsu snored loudly while somehow still wielding his thunder sword with precision. Inosuke's boar mask hid his furious expression as he dueled Upper Moon Three. The scent of wisteria flowers filled the air as the Demon Slayer Corps prepared for their final battle against Muzan Kibutsuji.",

    // Jujutsu Kaisen
    "Gojo Satoru removed his blindfold, revealing his glowing Six Eyes as Sukuna's fingers twitched within Yuji's body. Megumi's Divine Dogs snarled while Nobara hammered nails into her straw doll. The Tokyo Jujutsu High school trembled as cursed energy reached unprecedented levels. 'Throughout Heaven and Earth, I alone am the honored one,' Gojo declared before unleashing Hollow Purple.",

    // Attack on Titan
    "Eren's Titan form roared as Mikasa's ODM gear sent her zipping through the air. Armin's strategic mind worked overtime while Levi sliced through Titans with inhuman speed. The walls had fallen, and the truth about Paradis Island was more horrifying than anyone imagined. 'If we kill all our enemies over there... will we finally be free?' Eren's words echoed across the battlefield.",

    // Hunter x Hunter
    "Gon's Jajanken rock smashed through the arena floor as Killua's lightning crackled around him. Hisoka licked his lips while watching from the shadows, his bungee gum stretching ominously. The Hunter Exam's final phase had begun, and Kurapika's scarlet eyes burned with vengeance against the Phantom Troupe. 'I'll become a Hunter no matter what!' Gon declared with his usual boundless enthusiasm.",

    // My Hero Academia
    "Deku's One For All power surged through his body as Bakugo exploded forward with his nitroglycerin sweat. All Might's muscular form appeared briefly in the smoke, inspiring the young heroes. Shoto created an ice wall before switching to his fire side, while Uraraka made debris float weightlessly. UA High's training ground became a battlefield as Class 1-A faced their greatest challenge yet.",

    // Chainsaw Man
    "Denji revved his chainsaw arms as Power's blood hammer manifested from her wounds. Makima watched with her unblinking eyes while Aki smoked his last cigarette. The Special Division 4 office was in ruins after the Gun Devil's attack. 'I just want to touch some boobs!' Chainsaw Man roared before diving back into the fray against the terrifying devils.",

    // Berserk
    "Guts' Dragonslayer sword cleaved through apostles as Casca fought back-to-back with him. Griffith's white hawk armor gleamed while the Band of the Hawk celebrated another victory. The Eclipse was coming, and the God Hand's ominous presence filled the air. The Brand of Sacrifice burned on Guts' neck as he swung his massive sword with superhuman strength.",

    // Bleach
    "Ichigo's Bankai released a torrent of spiritual pressure as Rukia's Sode no Shirayuki created beautiful ice flowers. Uryu's Quincy bow shimmered while Chad's right arm transformed. Soul Society trembled as Aizen revealed his true plans with the Hogyoku. 'Bankai... Tensa Zangetsu!' Ichigo shouted, his black Getsuga Tensho slicing through the sky.",

    // Black Clover
    "Asta swung his anti-magic greatsword as Yuno's wind spirit created a devastating tornado. Noelle's water magic formed a majestic sea dragon while the Black Bulls caused chaos as usual. The Clover Kingdom's magic knights assembled for the Royal Knights selection exam. 'I'm gonna be the Wizard King!' Asta screamed with his characteristic volume, undeterred by his lack of magic.",

    // Solo Leveling
    "Sung Jin-Woo's shadows writhed as he commanded his army of undead warriors. The S-rank hunters watched in disbelief as the former E-rank soloed an entire dungeon. The System's notifications flashed before his eyes: [Level Up!] Beru knelt before his new master, the Ant King's power now serving the Shadow Monarch. The gates were opening, and the world would never be the same.",

    // One Punch Man
    "Saitama punched through another meteor as Genos recorded the battle data. The Hero Association headquarters buzzed with activity while King's intimidating presence accidentally scared off more villains. 'Okay,' Saitama said with his usual bored expression after obliterating another world-ending threat. Meanwhile, Mumen Rider courageously faced opponents far beyond his strength level.",

    // Baki
    "Baki's muscles bulged as he faced his father Yujiro, the strongest creature on Earth. The underground arena shook with each devastating blow as martial artists from around the world watched in awe. Oliva's massive frame blocked attacks that would kill normal men, while Doppo Orochi's karate chops could split boulders. 'Fight me!' Baki screamed, his bloodline's Ogre power awakening.",

    // Tokyo Revengers
    "Takemichi's tears streamed down his face as he tried to change the future again. Mikey's dark impulses surfaced while Draken kept the Tokyo Manji Gang together. The time-leaping delinquent clenched his fists, determined to save everyone this time. 'I'll never give up!' Takemichi shouted, his courage outweighing his fear as he prepared to face another gang battle.",

    // Death Note
    "Light's fingers brushed the Death Note as Ryuk cackled overhead. L's deductive skills were closing in on Kira, while Misa's shinigami eyes saw lifespans ticking away. The psychological battle between geniuses reached its climax in the Yellow Box warehouse. 'I am justice!' Light declared, his god complex growing stronger with each name he wrote in the notebook.",

    // Vinland Saga
    "Thorfinn's dagger flashed as Askeladd parried with practiced ease. The Viking war band marched through snowy landscapes while Canute's transformation began. 'I have no enemies,' Thorfinn realized years later on his journey to Vinland. The former child warrior now sought peace, but the scars of his past still haunted him.",

    // JoJo's Bizarre Adventure
    "Jotaro's Star Platinum emerged with a mighty 'ORA ORA' as Dio's The World countered with 'MUDA MUDA'. The Stand users clashed in Cairo's streets while time itself seemed to bend around them. Joseph Joestar's Hamon skills were useless against these new threats. 'You thought it was just a normal punch, but it was me, Dio!' the vampire taunted before stopping time.",

    // Spy x Family
    "Loid's perfect spy facade nearly cracked when Anya suddenly read his mind. Yor's assassin instincts kicked in when she sensed danger near her makeshift family. Bond the dog foresaw the future while chaos ensued at Eden Academy. 'Waku waku!' Anya exclaimed, her telepathy revealing secrets that could topple nations.",

    // Fullmetal Alchemist
    "Edward's automail arm clanked as he performed alchemy without a circle. Alphonse's armored body reflected the moonlight while Mustang snapped his fingers to create fiery explosions. The truth behind the Philosopher's Stone was more horrifying than the Elric brothers imagined. 'Equivalent exchange!' Ed shouted as he clapped his hands together to transmute a massive spear."
];