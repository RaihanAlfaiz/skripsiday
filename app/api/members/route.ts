import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Member {
  id: string;
  name: string;
  role: string;
  status: string;
  portrait: string;
  quote: string;
  currentChapter: string;
  appreciationTitle: string;
  appreciationMessage: string;
  timeline: {
    stage: string;
    title: string;
    description: string;
    date: string;
  }[];
}

export async function GET() {
  const membersDir = path.join(process.cwd(), "public", "members");

  const getMemberImagePath = (memberName: string): string => {
    const extensions = [".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of extensions) {
      const fullPath = path.join(membersDir, `${memberName}${ext}`);
      if (fs.existsSync(fullPath)) {
        return `/members/${memberName}${ext}`;
      }
    }
    return `/members/${memberName}.jpg`;
  };

  const members: Member[] = [
    {
      id: "amanda",
      name: "Amanda",
      role: "Sahabat Perjuangan",
      status: "Defense Completed",
      portrait: getMemberImagePath("amanda"),
      quote: "Terima kasih sudah bertahan sampai sejauh ini. Senyumanmu di hari sidang adalah hadiah terindah untuk kita semua.",
      currentChapter: "Kenangan Abadi • Sahabat Penjaga Semangat",
      appreciationTitle: "Sang Penjaga Semangat & Pelukan Hangat",
      appreciationMessage: "Amanda adalah sosok yang selalu membawa ketenangan di saat kepanikan melanda. Saat revisi terasa tak menentu dan lelah menyelimuti, kehangatan dan kebaikan hatimu membuat perjuangan ini terasa jauh lebih ringan. Terima kasih telah hadir dan menjadi bagian tak terpisahkan dari cerita ini.",
      timeline: [
        { stage: "Awal Langkah", title: "Mimpi Yang Sama", description: "Saat kita pertama kali duduk bersama, membawa cemas dan harapan yang bersatu dalam satu tujuan.", date: "Babak I" },
        { stage: "Malam Panjang", title: "Cangkir Kopi & Lelah", description: "Di bawah lampu kamar yang redup, kita saling menguatkan di tengah tumpukan berkas dan lelah yang menumpuk.", date: "Babak II" },
        { stage: "Saling Genggam", title: "Saat Semangat Redup", description: "Ketika revisi terasa mematahkan harapan, kamu hadir membawa kalimat hangat: 'Sedikit lagi, kita pasti bisa.'", date: "Babak III" },
        { stage: "Doa & Harapan", title: "H-1 Hari Penentuan", description: "Gemetar jemari dan doa setengah berbisik. Tatapan mata saling menguatkan menjelang detik terpenting.", date: "Babak IV" },
        { stage: "Kemenangan", title: "Senyum Pelukan Lega", description: "Pintu sidang terbuka, dan air mata bahagia akhirnya menetes. Kita telah berhasil melaluinya!", date: "Puncak Perjuangan" },
        { stage: "Selamanya", title: "Jejak Yang Tak Terhapus", description: "Sidang skripsi ini selesai, tapi kasih sayang dan kenangan indah kita akan abadi selamanya.", date: "Abadi" }
      ]
    },
    {
      id: "naila",
      name: "Naila",
      role: "Sahabat Perjuangan",
      status: "Defense Completed",
      portrait: getMemberImagePath("naila"),
      quote: "Tawa dan ceriamu adalah alasan kenapa malam-malam berat skripsi tak pernah terasa sepi.",
      currentChapter: "Kenangan Abadi • Cahaya di Tengah Badai",
      appreciationTitle: "Cahaya Cerak & Pelipur Lelah",
      appreciationMessage: "Naila adalah tawa yang selalu menghidupkan suasana. Di saat ruang bimbingan terasa menegangkan dan waktu terasa begitu menghimpit, keceriaanmu hadir bagaikan secercah cahaya hangat. Terima kasih sudah menjadi sosok yang selalu mengukir senyum di wajah kami.",
      timeline: [
        { stage: "Awal Langkah", title: "Mimpi Yang Sama", description: "Langkah awal yang penuh keberanian, memulai perjalanan skripsi bersama orang-orang tersayang.", date: "Babak I" },
        { stage: "Malam Panjang", title: "Tawa Penawar Lelah", description: "Malam-malam suntuk yang mendadak penuh dengan tawa renyahmu, mengubah tekanan menjadi kenangan indah.", date: "Babak II" },
        { stage: "Saling Genggam", title: "Keteguhan Hati", description: "Mencoret dan memperbaiki lembar demi lembar tanpa menyerah, ditemani kesetiaan sahabat.", date: "Babak III" },
        { stage: "Doa & Harapan", title: "Bisikan Keberanian", description: "Saling meyakinkan di lorong kampus bahwa kita mampu berdiri tegak di depan para penguji.", date: "Babak IV" },
        { stage: "Kemenangan", title: "Kebanggaan Yang Nyata", description: "Saat namamu dipanggil lulus, rasa bangga mendalam membuncah di dada kita semua.", date: "Puncak Perjuangan" },
        { stage: "Selamanya", title: "Kisah Yang Kita Peluk", description: "Setiap detiknya adalah kenangan manis yang takkan pernah pudar oleh sang waktu.", date: "Abadi" }
      ]
    },
    {
      id: "febianna",
      name: "Febianna",
      role: "Sahabat Perjuangan",
      status: "Defense Completed",
      portrait: getMemberImagePath("febianna"),
      quote: "Hati yang tulus dan kepedulianmu mengajarkan kita arti persahabatan yang sesungguhnya.",
      currentChapter: "Kenangan Abadi • Pelukan Kelembutan",
      appreciationTitle: "Jiwa Yang Tulus & Kelembutan Hati",
      appreciationMessage: "Febianna adalah ketulusan yang membuat setiap anggota merasa berharga dan didengar. Perhatian kecilmu, perhatian saat ada yang lelah, dan ketenanganmu adalah pilar penting yang menjaga kita tetap utuh selama masa-masa tersulit skripsi.",
      timeline: [
        { stage: "Awal Langkah", title: "Mimpi Yang Sama", description: "Memulai dengan niat yang tulus dan semangat untuk saling merangkul satu sama lain.", date: "Babak I" },
        { stage: "Malam Panjang", title: "Kehangatan Perhatian", description: "Menanyakan kabar, membagikan camilan, dan memastikan tidak ada seorang pun yang berjuang sendirian.", date: "Babak II" },
        { stage: "Saling Genggam", title: "Sabar Tanpa Batas", description: "Melintasi masa revisi yang melelahkan dengan kesabaran luar biasa dan senyum yang menenangkan.", date: "Babak III" },
        { stage: "Doa & Harapan", title: "Rasa Haru Bersama", description: "Detak jantung yang berpacu cepat, tapi pelukan hangatmu meredakan semua rasa takut.", date: "Babak IV" },
        { stage: "Kemenangan", title: "Air Mata Bahagia", description: "Suasana lega luar biasa yang menyelimuti tatkala sidang berakhir dengan indah.", date: "Puncak Perjuangan" },
        { stage: "Selamanya", title: "Kasih Yang Bermakna", description: "Terima kasih telah menjadi bagian paling manis dalam babak kehidupan yang indah ini.", date: "Abadi" }
      ]
    },
    {
      id: "hilman",
      name: "Hilman",
      role: "Sahabat Perjuangan",
      status: "Defense Completed",
      portrait: getMemberImagePath("hilman"),
      quote: "Kehadiranmu yang selalu siap membantu adalah benteng kekuatan kita bersama.",
      currentChapter: "Kenangan Abadi • Pelindung & Penguat",
      appreciationTitle: "Sosok Yang Selalu Ada & Penguat Langkah",
      appreciationMessage: "Hilman adalah sosok yang selalu siap mengulurkan tangan tanpa banyak bicara. Saat ada masalah teknis, berkas yang membingungkan, atau keputusasaan yang datang, keberadaanmu memberikan rasa aman dan keyakinan bahwa kita pasti bisa menyelesaikan ini bersama-sama.",
      timeline: [
        { stage: "Awal Langkah", title: "Mimpi Yang Sama", description: "Merajut komitmen untuk melangkah bersama dari awal hingga garis akhir sidang skripsi.", date: "Babak I" },
        { stage: "Malam Panjang", title: "Bahu Tempat Bersandar", description: "Tak pernah ragu membantu dan mendampingi hingga larut malam demi kelancaran teman-teman.", date: "Babak II" },
        { stage: "Saling Genggam", title: "Ketenangan Di Tengah Badai", description: "Menjadi peneduh saat rasa panik melanda, memastikan setiap langkah tetap terarah.", date: "Babak III" },
        { stage: "Doa & Harapan", title: "Kepalan Tangan Semangat", description: "Memberikan tos dan kata penguat sebelum melangkah masuk ke dalam ruang sidang.", date: "Babak IV" },
        { stage: "Kemenangan", title: "Pekik Kemenangan", description: "Sorak kegembiraan dan rasa haru melihat seluruh sahabat berhasil mempertahankan hasil karyanya.", date: "Puncak Perjuangan" },
        { stage: "Selamanya", title: "Saudara Dalam Perjuangan", description: "Bukan sekadar teman skripsi, melainkan ikatan persaudaraan yang diuji oleh waktu.", date: "Abadi" }
      ]
    },
    {
      id: "faisal",
      name: "Faisal",
      role: "Sahabat Perjuangan",
      status: "Defense Completed",
      portrait: getMemberImagePath("faisal"),
      quote: "Ketenangan dan kegigihanmu membuktikan bahwa tidak ada perjuangan yang sia-sia.",
      currentChapter: "Kenangan Abadi • Keteguhan Hati",
      appreciationTitle: "Ketenangan Jiwa & Kesetiaan Sahabat",
      appreciationMessage: "Faisal adalah simbol perjuangan yang tenang namun tak pernah patah. Kesetiaanmu untuk tetap berjuang, kerendahan hatimu, dan semangat pantang menyerahmu memberi contoh nyata tentang arti keteguhan. Terima kasih telah berjuang begitu indah bersama kami.",
      timeline: [
        { stage: "Awal Langkah", title: "Mimpi Yang Sama", description: "Menetapkan tekad bulat untuk memberikan yang terbaik dalam perjalanan akhir masa kuliah.", date: "Babak I" },
        { stage: "Malam Panjang", title: "Kesetiaan Tanpa Suara", description: "Duduk berdampingan dalam diam yang penuh makna, saling mendukung walau lelah teramat sangat.", date: "Babak II" },
        { stage: "Saling Genggam", title: "Perjuangan Pantang Menyerah", description: "Bangkit kembali setiap kali revisi menumpuk, dengan tekad bulat yang menginspirasi.", date: "Babak III" },
        { stage: "Doa & Harapan", title: "Tatapan Penuh Keyakinan", description: "Menarik napas dalam-dalam, melangkah mantap menuju momentum puncak yang telah lama ditunggu.", date: "Babak IV" },
        { stage: "Kemenangan", title: "Ukiran Sejarah Manis", description: "Pernyataan LULUS yang menggema membawa kebahagiaan tak terhingga bagi kita semua.", date: "Puncak Perjuangan" },
        { stage: "Selamanya", title: "Kenangan Yang Melekat", description: "Setiap tetes keringat dan tawa kita akan selalu tersimpan manis di dalam museum ini.", date: "Abadi" }
      ]
    }
  ];

  return NextResponse.json({ members });
}
