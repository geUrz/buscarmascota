import connection from "@/libs/db"
import slugify from "slugify"
import axios from "axios";

const ONE_SIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
const ONE_SIGNAL_API_KEY = process.env.NEXT_PUBLIC_ONESIGNAL_API_KEY;

// Función para enviar notificación
async function sendNotification(message) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`,
    };

    const data = {
        app_id: ONE_SIGNAL_APP_ID,
        included_segments: ['All'],
        contents: { en: message },
    };

    try {
        await axios.post('https://onesignal.com/api/v1/notifications', data, { headers });
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
}

export default async function handler(req, res) {
    const { id, usuario_id, estatus, especie, slug } = req.query; // Agregamos 'slug' al destructuring

    if (req.method === 'GET') {

        // Caso para obtener mascota por slug
        if (slug) {
            console.log('Buscando negocio con slug:', slug);
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug FROM mascotas WHERE slug = ?', [slug]);
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'Mascota no encontrado' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener mascotas destacados
        if (estatus) {
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug FROM mascotas WHERE estatus = ?', [estatus]);
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener mascotas por especie
        if (especie) {
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug FROM mascotas WHERE categoriaone = ? OR categoriatwo = ?', [especie]);
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener mascota por usuario_id
        if (usuario_id) {
            try {
                const [rows] = await connection.query('SELECT id, usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug FROM mascotas WHERE usuario_id = ?', [usuario_id]);
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'Mascota no encontrado' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            return;
        }

        // Caso para obtener todos los mascotas
        try {
            const [rows] = await connection.query('SELECT id, usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug FROM mascotas');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            const { usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos } = req.body;
            if (!usuario_id || !nombre || !estatus) {
                return res.status(400).json({ error: 'Todos los datos son obligatorios' });
            }

            // Generar el slug del nombre del mascota
            const slug = slugify(nombre, { lower: true, strict: true });

            const [result] = await connection.query(
                'INSERT INTO mascotas (usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [usuario_id, nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug]
            );

            // Enviar notificación después de crear la nota
            const message = `Se ha registrado una nueva mascota: ${id}.`
            await sendNotification(message)

            const newClient = { id: result.insertId }
            res.status(201).json(newClient)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'PUT') {
        if (!id) {
            return res.status(400).json({ error: 'ID del mascota es obligatorio' });
        }
        const { nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos } = req.body;
        if (!nombre || !estatus || !especie) {
            return res.status(400).json({ error: 'Todos los datos son obligatorios' });
        }
        try {

            // Generar el slug basado en el nombre del mascota
            const slug = slugify(nombre, { lower: true, strict: true });

            const [result] = await connection.query(
                'UPDATE mascotas SET nombre = ?, estatus = ?, especie = ?, raza = ?, tamaño = ?, edad = ?, sexo = ?, esterilizado = ?, salud = ?, descripcion = ?, requisitos = ?, slug = ? WHERE id = ?',
                [nombre, estatus, especie, raza, tamaño, edad, sexo, esterilizado, salud, descripcion, requisitos, slug, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Mascota no encontrado' });
            }

            res.status(200).json({ message: 'Mascota actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        if (!id) {
            return res.status(400).json({ error: 'ID del negocio es obligatorio' });
        }
        try {
            // Eliminar el negocio por ID
            const [result] = await connection.query('DELETE FROM mascotas WHERE id = ?', [id]);

            // Verificar si el negocio fue eliminado
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Mascota no encontrado' });
            }

            res.status(200).json({ message: 'Mascota eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
