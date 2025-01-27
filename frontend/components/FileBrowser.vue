
<template>
  <v-container>
    <v-card>
      <v-card-title>File Browser</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="files"
          item-value="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>File Management</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="uploadFile">Upload File</v-btn>
              <v-btn color="secondary" @click="createDirectory">Create Directory</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="downloadFile(item)">
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="deleteFile(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Size", value: "size" },
        { text: "Last Modified", value: "lastModified" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      files: [],
    };
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await axios.get("/api/ftp/list", { params: { path: "/" } });
        this.files = response.data.files.map((file) => ({
          name: file.name,
          size: file.size,
          lastModified: file.modifiedAt,
        }));
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    },
    uploadFile() {
      console.log("Upload file clicked");
      // Implement upload logic
    },
    createDirectory() {
      console.log("Create directory clicked");
      // Implement directory creation logic
    },
    downloadFile(file) {
      console.log("Download file:", file.name);
      // Implement download logic
    },
    deleteFile(file) {
      console.log("Delete file:", file.name);
      // Implement delete logic
    },
  },
  mounted() {
    this.fetchFiles();
  },
};
</script>
