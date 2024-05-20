// tsup.config.ts
import { defineConfig } from "tsup";
import path from "path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import fsPromises from "fs/promises";
console.log("hello");
var tsup_config_default = defineConfig({
  entry: ["src/index.ts", "src/lib/game-provider.tsx"],
  loader: {
    // ".svg": "base64",
  },
  esbuildPlugins: [
    {
      name: "css-module",
      setup(build) {
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "file" },
          (args) => ({
            path: `${args.path}#css-module`,
            namespace: "css-module",
            pluginData: {
              pathDir: path.join(args.resolveDir, args.path)
            }
          })
        );
        build.onLoad(
          { filter: /#css-module$/, namespace: "css-module" },
          async (args) => {
            const { pluginData } = args;
            const source = await fsPromises.readFile(
              pluginData.pathDir,
              "utf8"
            );
            let cssModule = {};
            const result = await postcss([
              postcssModules({
                getJSON(_, json) {
                  cssModule = json;
                }
              })
            ]).process(source, { from: pluginData.pathDir });
            return {
              pluginData: { css: result.css },
              contents: `import "${pluginData.pathDir}"; export default ${JSON.stringify(cssModule)}`
            };
          }
        );
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "css-module" },
          (args) => ({
            path: path.join(args.resolveDir, args.path, "#css-module-data"),
            namespace: "css-module",
            pluginData: args.pluginData
          })
        );
        build.onLoad(
          { filter: /#css-module-data$/, namespace: "css-module" },
          (args) => ({
            contents: args.pluginData.css,
            loader: "css"
          })
        );
      }
    }
  ],
  splitting: true,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  minify: true
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL2VyYXlrYXlhL3dvcmsvd2lucmxhYnMvcGtnLW1vbnJlcG8vcGFja2FnZXMvZ2FtZXMvdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL2VyYXlrYXlhL3dvcmsvd2lucmxhYnMvcGtnLW1vbnJlcG8vcGFja2FnZXMvZ2FtZXNcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL2VyYXlrYXlhL3dvcmsvd2lucmxhYnMvcGtnLW1vbnJlcG8vcGFja2FnZXMvZ2FtZXMvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidHN1cFwiO1xuLy8gaW1wb3J0IGVzYnVpbGQgZnJvbSBcImVzYnVpbGRcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgcG9zdGNzcyBmcm9tIFwicG9zdGNzc1wiO1xuaW1wb3J0IHBvc3Rjc3NNb2R1bGVzIGZyb20gXCJwb3N0Y3NzLW1vZHVsZXNcIjtcbmltcG9ydCBmc1Byb21pc2VzIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuXG5jb25zb2xlLmxvZyhcImhlbGxvXCIpO1xuXG4vLyBlc2J1aWxkLmJ1aWxkKHtcbi8vICAgcGx1Z2luczogW1xuLy8gICAgIENzc01vZHVsZXNQbHVnaW4oe1xuLy8gICAgICAgZm9yY2U6IHRydWUsXG4vLyAgICAgICBlbWl0RGVjbGFyYXRpb25GaWxlOiB0cnVlLFxuLy8gICAgICAgbG9jYWxzQ29udmVudGlvbjogXCJjYW1lbENhc2VPbmx5XCIsXG4vLyAgICAgICBuYW1lZEV4cG9ydHM6IHRydWUsXG4vLyAgICAgICBpbmplY3Q6IGZhbHNlLFxuLy8gICAgIH0pLFxuLy8gICBdLFxuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiBbXCJzcmMvaW5kZXgudHNcIiwgXCJzcmMvbGliL2dhbWUtcHJvdmlkZXIudHN4XCJdLFxuICBsb2FkZXI6IHtcbiAgICAvLyBcIi5zdmdcIjogXCJiYXNlNjRcIixcbiAgfSxcbiAgZXNidWlsZFBsdWdpbnM6IFtcbiAgICB7XG4gICAgICBuYW1lOiBcImNzcy1tb2R1bGVcIixcbiAgICAgIHNldHVwKGJ1aWxkKTogdm9pZCB7XG4gICAgICAgIGJ1aWxkLm9uUmVzb2x2ZShcbiAgICAgICAgICB7IGZpbHRlcjogL1xcLm1vZHVsZVxcLmNzcyQvLCBuYW1lc3BhY2U6IFwiZmlsZVwiIH0sXG4gICAgICAgICAgKGFyZ3MpID0+ICh7XG4gICAgICAgICAgICBwYXRoOiBgJHthcmdzLnBhdGh9I2Nzcy1tb2R1bGVgLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBcImNzcy1tb2R1bGVcIixcbiAgICAgICAgICAgIHBsdWdpbkRhdGE6IHtcbiAgICAgICAgICAgICAgcGF0aERpcjogcGF0aC5qb2luKGFyZ3MucmVzb2x2ZURpciwgYXJncy5wYXRoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgYnVpbGQub25Mb2FkKFxuICAgICAgICAgIHsgZmlsdGVyOiAvI2Nzcy1tb2R1bGUkLywgbmFtZXNwYWNlOiBcImNzcy1tb2R1bGVcIiB9LFxuICAgICAgICAgIGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHBsdWdpbkRhdGEgfSA9IGFyZ3MgYXMge1xuICAgICAgICAgICAgICBwbHVnaW5EYXRhOiB7IHBhdGhEaXI6IHN0cmluZyB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gYXdhaXQgZnNQcm9taXNlcy5yZWFkRmlsZShcbiAgICAgICAgICAgICAgcGx1Z2luRGF0YS5wYXRoRGlyLFxuICAgICAgICAgICAgICBcInV0ZjhcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IGNzc01vZHVsZSA9IHt9O1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcG9zdGNzcyhbXG4gICAgICAgICAgICAgIHBvc3Rjc3NNb2R1bGVzKHtcbiAgICAgICAgICAgICAgICBnZXRKU09OKF8sIGpzb24pIHtcbiAgICAgICAgICAgICAgICAgIGNzc01vZHVsZSA9IGpzb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdKS5wcm9jZXNzKHNvdXJjZSwgeyBmcm9tOiBwbHVnaW5EYXRhLnBhdGhEaXIgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBsdWdpbkRhdGE6IHsgY3NzOiByZXN1bHQuY3NzIH0sXG4gICAgICAgICAgICAgIGNvbnRlbnRzOiBgaW1wb3J0IFwiJHtcbiAgICAgICAgICAgICAgICBwbHVnaW5EYXRhLnBhdGhEaXJcbiAgICAgICAgICAgICAgfVwiOyBleHBvcnQgZGVmYXVsdCAke0pTT04uc3RyaW5naWZ5KGNzc01vZHVsZSl9YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBidWlsZC5vblJlc29sdmUoXG4gICAgICAgICAgeyBmaWx0ZXI6IC9cXC5tb2R1bGVcXC5jc3MkLywgbmFtZXNwYWNlOiBcImNzcy1tb2R1bGVcIiB9LFxuICAgICAgICAgIChhcmdzKSA9PiAoe1xuICAgICAgICAgICAgcGF0aDogcGF0aC5qb2luKGFyZ3MucmVzb2x2ZURpciwgYXJncy5wYXRoLCBcIiNjc3MtbW9kdWxlLWRhdGFcIiksXG4gICAgICAgICAgICBuYW1lc3BhY2U6IFwiY3NzLW1vZHVsZVwiLFxuICAgICAgICAgICAgcGx1Z2luRGF0YTogYXJncy5wbHVnaW5EYXRhIGFzIHsgY3NzOiBzdHJpbmcgfSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBidWlsZC5vbkxvYWQoXG4gICAgICAgICAgeyBmaWx0ZXI6IC8jY3NzLW1vZHVsZS1kYXRhJC8sIG5hbWVzcGFjZTogXCJjc3MtbW9kdWxlXCIgfSxcbiAgICAgICAgICAoYXJncykgPT4gKHtcbiAgICAgICAgICAgIGNvbnRlbnRzOiAoYXJncy5wbHVnaW5EYXRhIGFzIHsgY3NzOiBzdHJpbmcgfSkuY3NzLFxuICAgICAgICAgICAgbG9hZGVyOiBcImNzc1wiLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIHNwbGl0dGluZzogdHJ1ZSxcbiAgZm9ybWF0OiBbXCJlc21cIiwgXCJjanNcIl0sXG4gIGR0czogdHJ1ZSxcbiAgc291cmNlbWFwOiB0cnVlLFxuICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG4gIG1pbmlmeTogdHJ1ZSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLG9CQUFvQjtBQUVuVixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sZ0JBQWdCO0FBRXZCLFFBQVEsSUFBSSxPQUFPO0FBY25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU8sQ0FBQyxnQkFBZ0IsMkJBQTJCO0FBQUEsRUFDbkQsUUFBUTtBQUFBO0FBQUEsRUFFUjtBQUFBLEVBQ0EsZ0JBQWdCO0FBQUEsSUFDZDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFhO0FBQ2pCLGNBQU07QUFBQSxVQUNKLEVBQUUsUUFBUSxrQkFBa0IsV0FBVyxPQUFPO0FBQUEsVUFDOUMsQ0FBQyxVQUFVO0FBQUEsWUFDVCxNQUFNLEdBQUcsS0FBSyxJQUFJO0FBQUEsWUFDbEIsV0FBVztBQUFBLFlBQ1gsWUFBWTtBQUFBLGNBQ1YsU0FBUyxLQUFLLEtBQUssS0FBSyxZQUFZLEtBQUssSUFBSTtBQUFBLFlBQy9DO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxjQUFNO0FBQUEsVUFDSixFQUFFLFFBQVEsZ0JBQWdCLFdBQVcsYUFBYTtBQUFBLFVBQ2xELE9BQU8sU0FBUztBQUNkLGtCQUFNLEVBQUUsV0FBVyxJQUFJO0FBSXZCLGtCQUFNLFNBQVMsTUFBTSxXQUFXO0FBQUEsY0FDOUIsV0FBVztBQUFBLGNBQ1g7QUFBQSxZQUNGO0FBRUEsZ0JBQUksWUFBWSxDQUFDO0FBQ2pCLGtCQUFNLFNBQVMsTUFBTSxRQUFRO0FBQUEsY0FDM0IsZUFBZTtBQUFBLGdCQUNiLFFBQVEsR0FBRyxNQUFNO0FBQ2YsOEJBQVk7QUFBQSxnQkFDZDtBQUFBLGNBQ0YsQ0FBQztBQUFBLFlBQ0gsQ0FBQyxFQUFFLFFBQVEsUUFBUSxFQUFFLE1BQU0sV0FBVyxRQUFRLENBQUM7QUFFL0MsbUJBQU87QUFBQSxjQUNMLFlBQVksRUFBRSxLQUFLLE9BQU8sSUFBSTtBQUFBLGNBQzlCLFVBQVUsV0FDUixXQUFXLE9BQ2IscUJBQXFCLEtBQUssVUFBVSxTQUFTLENBQUM7QUFBQSxZQUNoRDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQ0EsY0FBTTtBQUFBLFVBQ0osRUFBRSxRQUFRLGtCQUFrQixXQUFXLGFBQWE7QUFBQSxVQUNwRCxDQUFDLFVBQVU7QUFBQSxZQUNULE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxLQUFLLE1BQU0sa0JBQWtCO0FBQUEsWUFDOUQsV0FBVztBQUFBLFlBQ1gsWUFBWSxLQUFLO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQ0EsY0FBTTtBQUFBLFVBQ0osRUFBRSxRQUFRLHFCQUFxQixXQUFXLGFBQWE7QUFBQSxVQUN2RCxDQUFDLFVBQVU7QUFBQSxZQUNULFVBQVcsS0FBSyxXQUErQjtBQUFBLFlBQy9DLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLEtBQUs7QUFBQSxFQUNMLFdBQVc7QUFBQSxFQUNYLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUMvQixRQUFRO0FBQ1YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
