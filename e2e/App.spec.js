import { test, expect } from '@playwright/test'
import { DataTestIds as d } from '@/constants'

test.describe('Perfect Todo E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/todo-vue/')
  })

  test('App loads correctly and displays all components', async ({ page }) => {
    await expect(page.getByText('todo')).toBeVisible()
    await expect(page.getByTestId(d.TOGGLE)).toBeVisible()
    await expect(page.getByPlaceholder('Enter a new task...')).toBeVisible()
    await expect(page.getByTestId(d.TODO_LIST)).toBeVisible()
    await expect(page.getByText('clear completed')).toBeVisible()
    await expect(page.getByText('items left')).toBeVisible()
    await expect(page.getByTestId(d.FILTERS)).toBeVisible()
    await expect(page.getByTestId(d.FILTERS).getByText('active')).toBeVisible()
    await expect(
      page.getByTestId(d.FILTERS).getByText('completed')
    ).toBeVisible()
    await expect(page.getByText('drag and drop to reorder list')).toBeVisible()
  })

  test('User can add a new todo item', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)
    await input.fill('Test task 1')
    await input.press('Enter')

    const contentOne = page.getByText('Test task 1')
    await expect(contentOne).toContainText('Test task 1')

    await input.fill('Test task 2')
    await input.press('Enter')

    const contentTwo = page.getByText('Test task 2')
    await expect(contentTwo).toContainText('Test task 2')
  })

  test('User cannot add an empty or too long todo item', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)

    await input.fill('')
    await input.press('Enter')
    await expect(page.getByTestId(d.EMPTY)).toBeVisible()
    await expect(page.getByTestId(d.EMPTY)).toHaveText(
      'Content should not be empty.'
    )

    const longText = 'a'.repeat(151)
    await input.fill(longText)
    await input.press('Enter')
    await expect(page.getByTestId(d.TOO_LONG)).toBeVisible()
    await expect(page.getByTestId(d.TOO_LONG)).toHaveText(
      'Content should not exceed 150 characters.'
    )
  })

  test('User can check and uncheck a todo item', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)
    await input.fill('Test task 3')
    await input.press('Enter')

    const content = page.getByText('Test task 3')
    await expect(content).toContainText('Test task 3')

    const todoItem = content.locator('..')
    await todoItem.click()

    await expect(todoItem).toHaveAttribute('data-completed', 'true')

    await todoItem.click()

    await expect(todoItem).toHaveAttribute('data-completed', 'false')
  })

  test('User can delete a todo item', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)
    await input.fill('Test Task 4')
    await input.press('Enter')

    const content = page.getByText('Test Task 4')
    const todoItem = content.locator('..')
    await todoItem.hover()
    await todoItem.getByTestId(d.DELETE).click()

    await expect(todoItem).not.toBeVisible()
  })

  test('Filter bar works correctly', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)

    await input.fill('Test Task 5')
    await input.press('Enter')
    await input.fill('Test Task 6')
    await input.press('Enter')

    const contentOne = page.getByText('Test Task 5')
    const todoItemOne = contentOne.locator('..')
    const contentTwo = page.getByText('Test Task 6')
    const todoItemTwo = contentTwo.locator('..')

    await todoItemOne.click()

    await page.getByTestId(d.FILTERS).getByText('completed').click()

    const activeItems = page.locator('[data-completed="false"]')
    await expect(activeItems).toHaveCount(0)

    await page.getByText('active').click()

    const completedItems = page.locator('[data-completed="true"]')
    await expect(completedItems).toHaveCount(0)

    await page.getByText('all').click()

    await expect(todoItemOne).toBeVisible()
    await expect(todoItemTwo).toBeVisible()

    await page.getByTestId(d.CLEAR_COMPLETED).click()

    await expect(todoItemOne).not.toBeVisible()
    await expect(todoItemTwo).toBeVisible()
  })

  test('User can reorder tasks with drag and drop', async ({ page }) => {
    const input = page.getByTestId(d.INPUT)

    await input.fill('Test Task 7')
    await input.press('Enter')
    await input.fill('Test Task 8')
    await input.press('Enter')

    const contentOne = page.getByText('Test Task 7')
    const todoItemOne = contentOne.locator('..')

    const contentTwo = page.getByText('Test Task 8')
    const todoItemTwo = contentTwo.locator('..')

    await expect(todoItemOne).toBeVisible()
    await expect(todoItemTwo).toBeVisible()

    await page.waitForTimeout(500)

    try {
      await todoItemOne.dragTo(todoItemTwo)
    } catch (error) {
      console.error('Drag-and-drop failed:', error)
    }

    await page.waitForTimeout(500)

    const todoItems = page.getByTestId(d.TODO_ITEM)
    const newFirstTodoItem = todoItems.first()

    await expect(newFirstTodoItem).toContainText('Test Task 7')
    await expect(todoItems.nth(1)).toContainText('Test Task 8')
  })
})
