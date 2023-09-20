### **¿CommonJS Modules o ES Modules, cual debería usar?**

Desde el principio, es importante que tomes una decisión respecto a qué tipo de
módulos utilizarás: ES Modules (import/export) o CommonJS Modules
(require/module.exports). Ambos cumplen el mismo propósito de modularizar y
compartir código. Hasta ahora, Node.js ha empleado mayormente los CommonJS
Modules (require) y funcionan sin necesidad de configuraciones adicionales.
Sin embargo, en las versiones más recientes de Node.js, también puedes optar
por utilizar ES Modules, aunque esto requerirá algunos pasos de configuración
adicionales. Si decides utilizar ES Modules, asegúrate de investigar cómo
configurar tu proyecto según la versión de Node que estés utilizando. Ten en
cuenta esta decisión desde el inicio de tu proyecto, ya que afectará la forma
en que importas y exportas módulos en tu código.

### **¿Cuáles son partes de node son relevantes para este proyecto?**

Node ofrece una amplia gama de módulos y funciones, pero no es necesario
conocerlos todos antes de comenzar a programar. Los hitos se refieren a partes
específicas de Node que puedes explorar, como los módulos `fs` (`readFile`,
`readdirSync`) y `path`.
Estos módulos son útiles para realizar operaciones de lectura y escritura de
archivos, así como para manipular y trabajar con rutas de archivos en tu código.
A medida que avanzas en tu proyecto, puedes investigar más sobre estos módulos
y cómo utilizar sus funciones para lograr tareas específicas. ¡No dudes en
sumergirte en la programación y explorar los partes relevantes de Node mientras
avanzas en tu proyecto!