import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { ProductosScreen } from './ProductosScreen';
import clientApi from '../api/clientApi';

// Mock del módulo clientApi
jest.mock('../api/clientApi');

const mockNavigation = {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn((event, callback) => callback()),
};

describe('ProductosScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading indicator initially', () => {
        render(<ProductosScreen navigation={mockNavigation} />);
        expect(screen.getByRole('activityindicator')).toBeTruthy();
    });

    test('fetches and displays products', async () => {
        // Mock de la respuesta de la API
        (clientApi.get as jest.Mock).mockResolvedValueOnce({
            data: { data: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] },
        });

        render(<ProductosScreen navigation={mockNavigation} />);

        // Espera a que el loading se termine y los productos se muestren
        await waitFor(() => {
            expect(screen.queryByRole('activityindicator')).toBeNull();
        });

        expect(screen.getByText('Cantidad:2')).toBeTruthy();
        expect(screen.getByText('Product 1')).toBeTruthy();
        expect(screen.getByText('Product 2')).toBeTruthy();
    });

    test('displays empty component when no products available', async () => {
        (clientApi.get as jest.Mock).mockResolvedValueOnce({
            data: { data: [] },
        });

        render(<ProductosScreen navigation={mockNavigation} />);

        await waitFor(() => {
            expect(screen.queryByRole('activityindicator')).toBeNull();
        });

        expect(screen.getByText('No hay Productos disponibles')).toBeTruthy();
    });

    test('searches products', async () => {
        (clientApi.get as jest.Mock).mockResolvedValueOnce({
            data: { data: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] },
        });

        render(<ProductosScreen navigation={mockNavigation} />);

        await waitFor(() => {
            expect(screen.queryByRole('activityindicator')).toBeNull();
        });

        const searchInput = screen.getByPlaceholderText('Search...');
        fireEvent.changeText(searchInput, 'Product 1');

        expect(await screen.findByText('Product 1')).toBeTruthy();
        expect(screen.queryByText('Product 2')).toBeNull();
    });

    test('navigates to AddProductScreen on button press', () => {
        render(<ProductosScreen navigation={mockNavigation} />);
        const button = screen.getByText('Agregar');
        fireEvent.press(button);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('AddProductScreen');
    });
});
