// gives the website access to the public Cloudflare photos bucket (found @ photos.gemmill.net)
// photos are currently sorted by "Film [num]/filename.JPEG" (subject to change later)
// claude didnt write this by the way... we in the trenches writing our evil code by HAND

// returns a JSON of all the photos in the bucket
export async function onRequest(context) {
  const bucket = context.env.PHOTOS;
  const result = await bucket.list();

  const fileNames = [];
  for (const file of result.objects) {
    fileNames.push(file.key);
  }

  return Response.json(fileNames);
}