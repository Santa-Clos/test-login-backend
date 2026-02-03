import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

export class MovieModel {

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT title, year, director, duration, poster, rate, id FROM movie;'
    )
    return rows ?? null
  }
  // 🔍 Obtener una película por ID
  static async getById ({ id }) {
    const { rows } = await pool.query(
      'SELECT * FROM movie WHERE id = $1;',
      [id]
    )

    return rows[0] ?? null
  }

  // ➕ Crear una película
  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const { rows } = await pool.query(
      `INSERT INTO movie (title, year, director, duration, poster, rate)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      [title, year, director, duration, poster, rate]
    )

    return rows[0]
  }

  // ❌ Eliminar una película
  static async delete ({ id }) {
    const { rowCount } = await pool.query(
      'DELETE FROM movie WHERE id = $1;',
      [id]
    )

    return rowCount > 0
  }

  // ✏️ Actualizar una película
  static async update ({ id, input }) {
    const fields = []
    const values = []
    let index = 1

    for (const key in input) {
      fields.push(`${key} = $${index}`)
      values.push(input[key])
      index++
    }

    if (fields.length === 0) return null

    values.push(id)

    const { rows } = await pool.query(
      `UPDATE movie
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;`,
      values
    )

    return rows[0] ?? null
  }
}