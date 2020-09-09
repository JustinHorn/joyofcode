const hello = () => "Hello World!";
const feed = async (p, arg, context) => {
  const resources = await context.prisma.resource.findMany();
  return resources;
};

module.exports = { hello, feed };
