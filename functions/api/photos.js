// gives the website access to the public Cloudflare photos bucket (found @ photos.gemmill.net)
// photos are currently sorted by "Film [num]/filename.JPEG" (subject to change later)
// claude didnt write this by the way... we in the trenches writing our evil code by HAND

// returns a JSON of all the photos in the bucket
export async function onRequest(context) {
  const bucket = context.env.PHOTOS;
  const result = await bucket.list();

  const files = [];
  for (const file of result.objects) {
    if (!file.key.endsWith("/")) { // we dont want to return folders
      files.push(file);
    }
  }

  files.sort((a, b) => b.uploaded - a.uploaded);

  const fileNamesSorted = [];
  for (const file of files) {
    fileNamesSorted.push(file.key);
  }

  return Response.json(fileNamesSorted);
}