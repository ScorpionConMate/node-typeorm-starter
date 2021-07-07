import slugify from 'slugify';

export default function createSlug(title: string): string {
  const slug = `${title} ${new Date().getTime()}`;
  return slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
}
