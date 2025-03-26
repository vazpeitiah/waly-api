import { NextFunction, Request, Response } from 'express'

import * as categoryService from './category.service'
import { categorySchema } from './category.schema'

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    categorySchema.parse({ name })
    const category = await categoryService.createCategory({
      name,
    })
    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

export const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getCategories()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const category = await categoryService.getCategoryById(id)

    if (!category) {
      res.status(404).json({ message: 'category not found' })
      return
    }

    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const updatedCategory = await categoryService.updateCategory(id, {
      name,
    })

    res.status(200).json(updatedCategory)
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const deletedCategory = await categoryService.deleteCategory(id)

    res.status(200).json(deletedCategory)
  } catch (error) {
    next(error)
  }
}
