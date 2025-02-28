import { Component, AfterViewInit } from '@angular/core';

declare var NiraAPI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'mock-api-project';

  // 3D Model yüklendikten sonra dropdown’u göstermek için kullandığımız flag
  viewerReady: boolean = false;

  ngAfterViewInit(): void {
    this.initNiraViewer();
  }

  private initNiraViewer(): void {
    // Eğer NiraAPI yüklenmediyse, hata vermesin.
    if (typeof NiraAPI === 'undefined' || !NiraAPI.Viewer) {
      console.warn("⚠️ NiraAPI is not available. Skipping initialization.");
      return;
    }

    try {
      const iframeElement = document.getElementById('niraviewer');
      if (!iframeElement) {
        return;
      }

      // Nira Viewer’ı başlat
      const viewer = new NiraAPI.Viewer(iframeElement);

      // Model tamamen yüklendiğinde tetiklenir
      viewer.on('asset_load_finish', () => {
        console.log("✅ Nira Viewer: Asset loaded successfully");
        viewer.setToolMode(NiraAPI.Toolmode.Orbit);

        // Model yüklendi -> Artık <app-user> menüsünü gösterebiliriz
        this.viewerReady = true;
      });

      // Hata yakalama
      viewer.on('error', (error: any) => {
        console.error("❌ Nira Viewer Error:", error);
      });

    } catch (error) {
      console.error("❌ Failed to initialize Nira Viewer:", error);
    }
  }
}
