   // Función simplificada y más robusta para generar PDF
        async function descargarCV() {
            const btnDownload = document.querySelector('.btn-download');
            const originalHTML = btnDownload.innerHTML;
            
            try {
                // Cambiar texto del botón
                btnDownload.innerHTML = '⏳ Generando PDF...';
                btnDownload.disabled = true;

                // Obtener el elemento a convertir
                const element = document.getElementById('cv-content');
                
                // Verificar que el elemento existe
                if (!element) {
                    throw new Error('No se pudo encontrar el contenido del CV');
                }

                console.log('Iniciando generación de PDF...');

                // Crear canvas con html2canvas
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: element.scrollWidth,
                    height: element.scrollHeight,
                    scrollX: 0,
                    scrollY: 0,
                    logging: false
                });

                console.log('Canvas creado exitosamente');

                // Crear PDF con jsPDF
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                // Calcular dimensiones
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 295; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                // Agregar la imagen al PDF
                const imgData = canvas.toDataURL('image/jpeg', 0.8);
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // Si necesita múltiples páginas
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                console.log('PDF generado exitosamente');

                // Descargar el PDF
                pdf.save('CV_Angel_David_Garcia.pdf');
                
                console.log('Descarga iniciada');

            } catch (error) {
                console.error('Error detallado:', error);
                alert('Error al generar el PDF: ' + error.message + '\n\nPor favor, intenta:\n1. Usar Chrome o Firefox\n2. Asegúrate de que la página esté completamente cargada\n3. Revisa la consola para más detalles (F12)');
            } finally {
                // Restaurar botón
                btnDownload.innerHTML = originalHTML;
                btnDownload.disabled = false;
            }
        }

        // Función para cargar imagen desde archivo local si existe
        function cargarImagenLocal() {
            const profileImg = document.getElementById('profileImg');
            const realImageUrl = '../images/image_me.png';
            
            // Crear una nueva imagen para probar si existe
            const testImg = new Image();
            testImg.onload = function() {
                // Si se carga, usar la imagen real
                profileImg.src = realImageUrl;
                console.log('Imagen real cargada exitosamente');
            };
            testImg.onerror = function() {
                console.log('Usando imagen por defecto (la imagen real no se encontró)');
            };
            testImg.src = realImageUrl;
        }

        // Inicializar cuando se carga la página
        window.addEventListener('load', function() {
            console.log('Página cargada completamente');
            
            // Intentar cargar imagen real
            cargarImagenLocal();
            
            // Animar barras de habilidades
            setTimeout(() => {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    bar.style.transition = 'width 1s ease-in-out';
                });
            }, 500);
            
            console.log('Inicialización completada');
        });

        // Verificar disponibilidad de librerías
        window.addEventListener('load', function() {
            if (typeof html2canvas === 'undefined') {
                console.error('html2canvas no está disponible');
            } else {
                console.log('html2canvas cargado correctamente');
            }
            
            if (typeof window.jspdf === 'undefined') {
                console.error('jsPDF no está disponible');
            } else {
                console.log('jsPDF cargado correctamente');
            }
        });